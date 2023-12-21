const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { data } = require('jquery');
const router = Router();

router.post('/signup', async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let fullName = req.body.fullName

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
  

    const record = await User.findOne({ email: email });
  
      if (record) {
        return res.status(400).send({
          message: "Email is already registered."
        });
      }else {
        const user = new User({
          fullName: fullName,
          email: email,
          password: hashed
      });
  
      const result = await user.save();

      const { _id } = await result.toJSON();
      const token = jwt.sign({ _id: _id }, process.env.jwt_key);
  
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });
   
      res.send({ message: "Sign up successfully" });
  }
  });

router.post('/login', async (req, res) => {
  const user = await User.findOne({email:req.body.email})
  if(!user){
    return res.status(404).send({
      message:"User not found"
    })
  }
  if(!(await bcrypt.compare(req.body.password, user.password))){
    return res.status(400).send({
      message: "Password is incorrect"
    })
  }
  const token = jwt.sign({_id:user._id}, process.env.jwt_key)
  res.cookie("jwt",token,{
    httpOnly: true,
    maxAge: 24*60*60*1000
  })
  res.send({
    message:"Success"
  })});

router.get('/user', async (req, res) => {
  try {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie,process.env.jwt_key)
    if (!claims){
      return res.status(401).send({
        message:"Unauthenticated"
      })
    }
    const user = await User.findOne({_id:claims._id})

    const {password, ... data} = await user.toJSON()
    
    res.send(data)
  } catch(err){
    return res.status(401).send({
      message:"Unauthenticated"
    })
  }
});
router.post('/logout',(req,res)=>{
  res.cookie("jwt","",{maxAge:0})
  res.send({
    message:"Success"
  })
})
module.exports = router;
