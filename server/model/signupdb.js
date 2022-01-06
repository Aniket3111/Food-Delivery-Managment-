const mongoose = require("mongoose")

var schema1 = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: String,

})
const signupdb = mongoose.model("signupdb",schema1);
module.exports =  signupdb