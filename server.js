// require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost:27017/weatherData', {useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=> console.log('DB connected'))
    .catch(err => console.log(`DB connection error: ${err}`))


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use('/weather', require('./routes/weather'))


app.listen(5000, ()=>console.log('Server Started'))