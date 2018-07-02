const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const db = require('./app/config/db.js')



//defining the app
const app = express()

//defining port 
const port = process.env.PORT || 5004
//middlewares
app.use(bodyParser.json());


//defining mongoose
mongoose.connect(db.url)

//defining routes
require('./app/routes/users.js')(app)

//
app.listen(port)
console.log('port is on '+ port)

