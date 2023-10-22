const express=require('express')
const app=express()
const dotenv=require('dotenv')
const cors = require('cors'); // Import the cors package

dotenv.config();

const dbConfig=require('./db')
const roomsRoute=require('./routes/roomsRoute')
const usersRoute=require('./routes/usersRoute')
const bookingsRoute=require('./routes/bookingsRoute')

app.use(cors());

app.use(express.json())
app.use('/api/rooms',roomsRoute)
app.use('/api/users',usersRoute)
app.use('/api/bookings',bookingsRoute)



const port=process.env.PORT||5001
app.listen(port,()=>{
    console.log(`Server started at ${port}`)
})