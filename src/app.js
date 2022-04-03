const express = require('express')
var bodyParser = require('body-parser');

const userRoute = require('./routes/userRoute')








const app = express()
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/v1', userRoute)



module.exports = app