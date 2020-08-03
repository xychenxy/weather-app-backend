const mongoose = require('mongoose')

const weather = new mongoose.Schema({
    cityName:{
        type:String,
        required:true
    },
    countryName:{
        type:String,
    },
    countryCode:{
        type:String,
    },
    reqResult:{
        type:Boolean,
        default: false
    },
    queryDate:{
        type:Date,
        required:true,
        default:Date.now
    }
})

module.exports = mongoose.model('weather',weather)