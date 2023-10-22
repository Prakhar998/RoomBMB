const express = require('express');
const router = express.Router();
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(SP);

const Room = require('../models/room');
const Booking = require('../models/booking');

router.post('/bookroom', async (req, res) => {
  const { room, userid, toDate, fromDate, totalAmount, totalDays, token } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Amount in cents
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
      metadata: {
        userId: userid, // Add any additional metadata you need
        roomId: room._id,
      },
    });

    if (paymentIntent) {
        const newBooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid,
          toDate: moment(toDate, 'DD-MM-YYYY'),
          fromDate: moment(fromDate, 'DD-MM-YYYY'),
          totalAmount,
          totalDays,
          transactionid: '1234',
        });

        const booking = await newBooking.save();

        const roomtemp = await Room.findOne({ _id: room._id });

        if (!roomtemp) {
          return res.status(404).json({ error: 'Room not found' });
        }

        if (!roomtemp.currentbookings) {
          roomtemp.currentbookings = [];
        }

        roomtemp.currentbookings.push({
          bookingid: booking._id,
          toDate: moment(toDate, 'DD-MM-YYYY'),
          fromDate: moment(fromDate, 'DD-MM-YYYY'),
          userid,
          status: booking.status,
        });

        await roomtemp.save();

        return res.send('Payment Successful, Your booking is completed');
      } 
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: 'Payment failed' });
  }
});

module.exports = router;
