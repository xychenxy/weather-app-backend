const express = require('express')
const router = express.Router()
const Weather = require('../models/weatherSchema')


// get all
router.get('/', async (req, res)=>{
    try{
        const weather = await Weather.find()
        res.json(weather)
    }catch(err){
        res.status(500).json({msg: err.message})
    }
})

// get one
router.get('/:id', getWeather, (req, res)=>{
    res.json(res.weather)
})


// create one
router.post('/',async(req, res)=>{
    const weather = new Weather({
        cityName:req.body.cityName,
        countryName:req.body.countryName,
        countryCode:req.body.countryCode,
        reqResult:req.body.reqResult
    })
    try{
        const newWeather = await weather.save()
        res.status(201).json(newWeather)
    }catch(err){
        res.status(400).json({msg: err.message})
    }
})

// update one
router.patch('/:id', getWeather, async (req, res)=>{
    if(req.body.cityName != null){
        res.weather.cityName = req.body.cityName
    }
    if (req.body.countryName != null) {
        res.weather.countryName = req.body.countryName
    }
    if (req.body.countryCode != null) {
        res.weather.countryCode = req.body.countryCode
    }
    try {
        const updateWeather = await res.weather.save()
        res.json(updateWeather)
    } catch (error) {
        res.status(400).json({msg: err.message})
    }
})

// delete one
router.delete('/:id', getWeather, async (req, res)=>{
    try {
        await res.weather.remove()
        res.json({msg: 'Deleted subscriber'})
    } catch (error) {
        res.status(500).json({msg: err.message})
    }
})

async function getWeather(req, res, next){
    let weather;
    try{
        weather = await Weather.findById(req.params.id)
        if(weather == null){
            return res.status(404).json({msg:'cannot find subscriber'})
        }
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
    res.weather = weather
    next()
}

module.exports = router
