const axios = require("axios")

const fetchuser = require("../middleware/fetchuser")

exports.homeRoutes = (req,res)=>{
    axios.get("http://localhost:3000/api/users")
    .then(function(response){
        res.render('index',{users:response.data})
    })
    .catch(err=>{
        res.send(err)
    })
    
}

exports.add_user =  (req,res)=>{
     res.render('add_user')
}
exports.signup = (req,res)=>{
    res.render('signup')
}
exports.login = (req,res)=>{
    res.render('login')
}
exports.update_user = (req,res)=>{
    axios.get(`http://localhost:3000/api/users`,{params:{id:req.query.id}})
    .then(function(userdata){
        res.render("update_user",{user:userdata.data})
    })
    .catch(err=>{
        res.send(err);
    })
}
