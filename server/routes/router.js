const express = require('express')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser")
const route = express.Router()
const services = require('../services/render')
const controller = require("../controller/controller");
const signupdb = require('../model/signupdb');

route.get('/',services.home)
route.get('/orderdata',services.homeRoutes)
route.get('/signup',services.signup)
route.get('/login',services.login)
route.get('/featured',services.featured)
route.get('/add-user', services.add_user)
route.get('/update-user',services.update_user)

route.post("/api/users",controller.create)
route.get("/api/users",controller.find)
route.put("/api/users/:id",controller.update)
route.delete("/api/users/:id",controller.delete)


const JWT_SECRECT="aniketisprogra$$er"

//route1
route.post('/signup',[
  body('email',"Enter a valid Email").isEmail(),
  // password must be at least 5 chars long
  body('password',).isLength({ min: 5 }),
],async (req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let signup = await signupdb.findOne({email: req.body.email});
    if(signup){
      return res.status(400).json({error: "Sorry User exists"})
    }
    const salt = await bcrypt.genSalt(10);
    secpass = await bcrypt.hash(req.body.password,salt);
    signup = await signupdb.create({
      name:req.body.name,
      email: req.body.email,
      password: secpass,
    })
    const data={
      id: signup.id
    }
   const authtoken = jwt.sign(data,JWT_SECRECT)
  //res.json(login)
  res.redirect('/')
  
}catch(error){
  console.error(error.message);
  res.status(500).send({
    message: err.message
})}}
);

//route2
route.post('/login',[body('email',"Enter a valid Email").isEmail(),

],async (req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try{
      let signup = await signupdb.findOne({email});
      if(!signup){
        return res.status(400).json({error: "Please try to login again"})
      }
      const passwordcompare = await bcrypt.compare(password,signup.password);
      if(!passwordcompare){
        return res.status(400).json({error:"Please try to login with correct credentials"})
      }
      const data={
        id: signup.id
      }
     const authtoken = jwt.sign(data,JWT_SECRECT)
    //res.json(login)
    
    res.redirect("/orderdata")

    //res.json({authtoken})
    } catch (error){
      console.error(error.message);
      res.status(500).send(
      "Internal Server some error occured");
    }

})
route.post('/userlogin',[body('email',"Enter a valid Email").isEmail(),

],async (req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try{
      let signup = await signupdb.findOne({email});
      if(!signup){
        return res.status(400).json({error: "Please try to login again"})
      }
      const passwordcompare = await bcrypt.compare(password,signup.password);
      if(!passwordcompare){
        return res.status(400).json({error:"Please try to login with correct credentials"})
      }
      const data={
        id: signup.id
      }
     const authtoken = jwt.sign(data,JWT_SECRECT)
    //res.json(login)
    
    res.redirect("/featured")

    //res.json({authtoken})
    } catch (error){
      console.error(error.message);
      res.status(500).send(
      "Internal Server some error occured");
    }

})
module.exports = route