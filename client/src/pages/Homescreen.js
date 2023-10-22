import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fromDate, setFromDate] = useState(null); // Use null as an initial value
  const [toDate, setToDate] = useState(null); // Use null as an initial value
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/rooms/getallrooms');
        const data = response.data.rooms;

        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (e) {
        setError(true);
        console.error(e);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // When fromDate and toDate change, filter the rooms
    if (fromDate && toDate) {
      filterRoomsByDate();
    }
  }, [fromDate, toDate]);

  // Function to filter rooms based on date range
  function filterRoomsByDate() {
    const tempRooms = duplicateRooms.filter((room) => {
      for (const booking of room.currentbookings) {
        if (
          moment(fromDate, 'DD-MM-YYYY').isBetween(booking.fromDate, booking.toDate, null, '[]') ||
          moment(toDate, 'DD-MM-YYYY').isBetween(booking.fromDate, booking.toDate, null, '[]')
        ) {
          return false; // Room is booked during this date range
        }
      }
      return true; // Room is available for this date range
    });

    setRooms(tempRooms);
  }

  // Function to handle date range selection
  function handleDateRangeChange(dates) {
    if (dates && dates.length === 2) {
      setFromDate(moment(dates[0]).format('DD-MM-YYYY'));
      setToDate(moment(dates[1]).format('DD-MM-YYYY'));
    } else {
      // Handle case when no valid date range is selected
      setFromDate(null);
      setToDate(null);
    }
  }

  function handleSearchInputChange(e) {
    setSearchKey(e.target.value);
  }

  function handleTypeChange(e) {
    setType(e.target.value);
    // You can add filtering by type here if needed
  }

  return (
    <div className='container'>
      <div className='row mt-5 bs'>
        <div className='col-md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={handleDateRangeChange} />
        </div>
        <div className='col-md-3'>
          <input
            type='text'
            className='form-control'
            placeholder='search rooms .......'
            value={searchKey}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className='col-md-3'>
          <select className='form-control' value={type} onChange={handleTypeChange}>
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non Delux</option>
          </select>
        </div>
      </div>
      <div className='row justify-content-center mt-5'>
        {loading ? (
          <h1><Loader /></h1>
        ) : error ? (
          <Error message='Something went wrong! Please Try Later.' />
        ) : (
          <div>
            {rooms.map((room) => (
              <div className='col-md-9 mt-4' key={room.id}>
                <Room room={room} fromDate={fromDate} toDate={toDate} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homescreen;
