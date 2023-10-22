const mongoose=require('mongoose')

var mu=
mongoose.connect(mu).then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('db connection failed');
})


module.exports = mongoose