const { response } = require("express");
var Userdb = require("../model/model");

//create and save user
exports.create = (req,res)=>{
   if(!req.body){
       res.status(400).send({message: "Content cannot be empty"});
       return;
   }

   //new user
   const user = new Userdb({
       name: req.body.name,
       email: req.body.email,
       gender: req.body.gender,
       status: req.body.status
   })


   user
   .save(user)
   .then(data => {
       //res.send(data)
       res.redirect('/add-user')
   })
   .catch(err=>{
       res.status(500).send({
           message: err.message || "some error occured while creating"
       });
   });
}

//retrieve return users
exports.find = (req,res)=>{
  if(req.query.id){
   const id = req.query.id;
   Userdb.findById(id)
   .then(data=>{
       if(!data){
           res.status(404).send({message:"not found id"})
       }else{
           res.send(data)
       }
   })
   .catch(err=>{
       res.status(500).send({message:"error retrieving user"})
   })
  }else{

  Userdb.find()
  .then(user =>{
      res.send(user)
  })
  .catch(err=>{
      res.status(500).send({message: err.message|| "error occured while finding"})
  })
}
}
exports.update = (req,res)=>{
   if(!req.body){
       return res
       .status(400)
       .send({message: "Data to update cannot be empty"})
   }
   const id = req.params.id;
   Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
   .then(data=>{
       if(!data){
       res.status(404).send({message:`cannot update user with ${id}`})
   }else{
       res.send(data)
   }
})
   .catch(err=>{
       res.status(500).send({message: "Error update user information"})
   })
}

exports.delete =(req,res)=>{
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
  .then(data=>{
      if(!data){
          res.status(404).send({message:`Cannot delete with ${id}`})
      }else{
          res.send({
              message:"user was deleted"
          })
      }
  })
  .catch(err=>{
      res.status(500).send({
          message: "Could not delete user with id"+id
      });
  })
}