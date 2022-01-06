var jwt = require("jsonwebtoken");
const JWT_SECRECT="aniketisprogra$$er"

const fetchuser = (req,res,next)=>{
    const token = req.header("auth-token");
    if(!token){
        res.status(404).send({error:"please authenticate using valid token"})
    }
    try{
        const data  = jwt.verify(token,JWT_SECRECT);
        req.signup=data.signup;
        next();

    }catch(error){
        res.status(401)

    }
   
   
}

module.exports=fetchuser