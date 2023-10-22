const express=require('express')
const router=express.Router()

const User=require('../models/user')

router.post('/register',async(req,res)=>{
    const newuser= new User(req.body)
    try {
        const user=await newuser.save()
        res.status(200).send('User Registered Successfully!')
    } catch (e) {
        return res.status(400).json({e})
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email, password: password });
      if (user) {
        const tmp = {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id,
        };
        res.send(tmp);
      } else {
        return res.status(401).json({ message: 'Login Failed' });
      }
    } catch (e) {
      return res.status(400).json({ e });
    }
  });
  

module.exports=router