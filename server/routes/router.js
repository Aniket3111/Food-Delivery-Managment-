const express = require('express')

const route = express.Router()
const services = require('../services/render')
const controller = require("../controller/controller");
route.get('/',services.homeRoutes)
route.get('/login',services.login)

route.get('/add-user',services.add_user)
route.get('/update-user',services.update_user)

route.post("/api/users",controller.create)
route.get("/api/users",controller.find)
route.put("/api/users/:id",controller.update)
route.delete("/api/users/:id",controller.delete)


const credentials = {
    email:"admin@gmail.com",
    password:"admin123"
}
route.post('/login',(req,res)=>{
    if(!req.body.email || !req.body.password){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }
  else if(req.body.email == credentials.email && req.body.password == credentials.password ){
    res.redirect('/')

  }else{
      res.end("Invalid Username")
  }
});
module.exports = route