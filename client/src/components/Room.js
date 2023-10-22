import React ,{useState,useEffect}from 'react'
import {Modal,Button,Carousel} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Room({room,fromDate,toDate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
   <div key={room._id} className='row bs'>
    <div className='col-md-4'>
    <img src={room.imageurl[1]} className='smallimg' />
    </div>
    <div className='col-md-7'>
      <h1>{room.name}</h1>
      <b>
      <p>Amenities:{room.facilities}</p>
      <p>Available Rooms:{room.maxcount}</p>
      <p>Contact Number:{room.phone}</p>
      <p>Price:${room.rent}/day</p>
      <p>Room Type:{room.roomtype}</p>
      </b>
      <div style={{float:'right'}}  >
      {(fromDate && toDate)&&(
        <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
        <button className='btn btn-primary m-2'>Book now!</button>
      </Link>
      )}
        <button className='btn btn-primary' onClick={handleShow} >View Details</button> 
        </div>
    </div>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
          {room.imageurl.map(url=>{
            return <Carousel.Item>
            <img
          className="d-block w-100 bimg"
          src={url}
        />
          </Carousel.Item>
          })}

          </Carousel>
          <b><p>{room.description}</p></b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
   </div>
  )
}

export default Room

// <>
// <div key={room._id}>
// <h1>{room.name}</h1>
// {/* <p>Room Type: {room.roomtype}</p>
// <p>Description: {room.description}</p>
// Add more room details as needed */}
// </div>
// </>