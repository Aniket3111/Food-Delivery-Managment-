const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path')
const app = express()
const connectDB= require("./server/database/connection")
dotenv.config({path:'config.env'})
const PORT = process.env.PORT|| 8080


//mongodb connection
connectDB();

app.use(express.json())
//log request
app.use(morgan('tiny'))

//parse requst to body-parser
app.use(bodyParser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"))

//load assests
app.use('/css',express.static(path.resolve(__dirname,"assests/css")))
app.use('/img',express.static(path.resolve(__dirname,"assests/img")))
app.use("/js",express.static(path.resolve(__dirname,"assests/js")))
//load routes
app.use('/',require("./server/routes/router"))
app.listen(3000,()=>{console.log(`Server is running on http://localhost:${PORT}`)});