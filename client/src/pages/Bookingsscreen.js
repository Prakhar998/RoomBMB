import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';


function Bookingsscreen() {
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { roomid, fromDate, toDate } = useParams();

  const fromDateMoment = moment(fromDate, 'DD-MM-YYYY');
  const toDateMoment = moment(toDate, 'DD-MM-YYYY');

  // Calculate the difference in days
  const totalDays = toDateMoment.diff(fromDateMoment, 'days')+1;
  const [totalAmount,setTotalAmount]=useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/rooms/getroombyid', { roomid });
        const data = response.data.room; // Extract the "rooms" array from the response
        setTotalAmount(data.rent*totalDays)
        setRoom(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [roomid]);
  async function bkn() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      toDate,
      fromDate,
      totalAmount,
      totalDays,
    };
  
    try {
      setLoading(true);
      const result = await axios.post('/api/bookings/bookroom', bookingDetails);
      setLoading(false);

      console.log('Before Swal');
      await Swal.fire({
        title: 'Congrats!',
        text: 'Your suite booked successfully',
        icon: 'success'
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect when the user confirms
          window.location.href = '/bookings';
        }
      });      
    } catch (error) {
      Swal.fire('Oops!', 'Something went wrong', 'error');
    }
    setLoading(false);
  }
  
  async function onToken(token){
    console.log(token)
    const bookingDetails={
      room,
      userid:JSON.parse(localStorage.getItem('currentUser'))._id,
      toDate,
      fromDate,
      totalAmount,
      totalDays,
      token
    }
    try {
      const result=await axios.post('/api/bookings/bookroom',bookingDetails)
    } catch (error) {
      
    }
  }

  return (
    <div className='m-5'>
      {loading ? (
        <h1><Loader /></h1>
      ) : error ? (
        <Error message='Something went wrong! Please Try Later.' />
      ) : (
        <div>
          <div className='row justify-content-center mt-5 bs'>
            <div className='col-md-5'>
              <h1>{room.name}</h1>
              <img src={room.imageurl[1]} className='bimg' alt={room.name} />
            </div>
            <div className='col-md-5'>
              <h4>Booking Details</h4>
              <hr />

              <div style={{ textAlign: 'right' }}>
                <b>
                  <p>Name:{JSON.parse(localStorage.getItem('currentUser')).name}</p>
                  <p>From date: {fromDate}</p>
                  <p>To date: {toDate}</p>
                  <p>Available Rooms: {room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: 'right' }}>
                <h4>Amount</h4>
                <hr />

                <b>
                  <p>Total Days:{totalDays}</p>
                  <p>Rent per Day: ${room.rent}</p>
                  <p>Total amount:{totalAmount}</p>
                </b>
              </div>
              <div style={{ float: 'right' }}>
                <StripeCheckout
                amount={totalAmount*100}
                currency='USD'
        token={onToken}
        stripeKey='pk_test_51N0OFSSBN5OlLc3x74jn6hiPrgqs10sFrOsZALnCnVIyIH7dKq62P3e6yBGiJYHrDM2k53fCrev8uXpCGIeaiEej000fTazoZA'
      >
        <button className='btn btn-primary' >Proceed to Payment</button>
        </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingsscreen;
