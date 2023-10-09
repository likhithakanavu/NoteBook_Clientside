const express = require("express")
const router = express.Router()
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// npm i bcryptjs
var jwt = require('jsonwebtoken');
// npm i jsonwebtoken
var fetchuser = require('../meduleware/fetchuser');

const JWT_SECRET = "hello"


// Route:1
router.post('/createuser', [
  body('name', "Enter a valid name").isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', "Enter a Valid Password").isLength({ min: 5 }),
], async (req, res) => {

  let success = false;
  //If there are errors, return bad request and errors

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }


  // const {
  //   name, email
  // } = req.body 
  //destructuring

  

  try {

    // Check whether the user with this email exists already

    let user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (user) {
      return res.status(400).json({ success,error: "Sorry a user with this email already exists " })
    }
    const salt = await bcrypt.genSalt(10); //10 rounds of hashing
  const secPass = await bcrypt.hash(req.body.password, salt) //hasing


    user = await User.create({
      name:req.body.name,
      email:req.body.email,
      password: secPass
    })

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    // console.log(jwtData)

    success= true

    console.log(success,authtoken)
    res.json({ success, authtoken })
  

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }

  // console.log(req.body);
  // it will print commend promt
  // res.send(req.body) // it will display thunderclaint
  // const user = User(req.body); // it will from moduls
  // user.save()
})


// Route : 2 Authonticate a User using: Post "/api/auth/login". No login required

router.post('/login', [

  body('email', "Enter a valid Email").isEmail(),
  body('password', "Enter a valid Password").exists(),

], async (req, res) => {

let success = false
  //If there are errors, return bad request and errors

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {

    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    } 

    const passwordcompare = await bcrypt.compare(password, user.password);

    if (!passwordcompare) {
      success = false;
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }


    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    success = true;
    res.json({ success, authtoken })
    console.log(authtoken)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server ");
  }

})


// Route :3 Get login a User details using: Post "/api/auth/getuser".  login required

router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id  ;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server ");
  }

})
module.exports = router