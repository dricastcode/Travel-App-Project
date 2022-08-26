// Setup empty JS object to act as endpoint for all routes
const fetch = require('node-fetch')


// DOTENV Require for environment
const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
const {
    json
} = require('body-parser');
const { response } = require('express');
// Initialize the main project folder
app.use(express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
})

app.post('/trip', async (req, res) => {
    let tripDetails = ''

    let coordinates = ''

    const cityName = req.body.city
    const apiKey = 'adrianc1'
    const geoName = `http://api.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${apiKey}`
    
    await (fetch(encodeURI(geoName)) 
    .then(response => response.json())
    .then(data => coordinates = {
        city: data.geonames[0].name,
        lat: data.geonames[0].lat,
        lng: data.geonames[0].lng
    })
    .catch(err => {
        console.log(err)
    }))

    let weatherDetails = ''
    
    const date = req.body.date
    const weatherAPI = 'e68a777e1dff4075b40f1e4dce814fbe'
    const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lng}&units=I&key=${weatherAPI}`

    await (fetch(weatherURL)
    .then(response => response.json())
    .then(response => weatherDetails = {
        weather: response.data[0].weather.description,
        temp: response.data[0].temp,
        icon: response.data[0].weather.icon
    })
    .catch(err => {
        console.log(err)
    }))
    
    let pictureLocation

    const pixAPI = '29440154-5815c08b7124649247ab31355'
    const pixURL = `https://pixabay.com/api/?key=${pixAPI}&q=${coordinates.city}&image_type=photo&per_page=3&category=places&orientation=horizontal&safesearch=true`

    await (fetch(pixURL)
    .then(response => response.json())
    .then(response => pictureLocation = {
        page: response.hits[0].pageURL,
        photo: response.hits[0].webformatURL
    })
    .catch(err => {
        console.log(err);
    }))

    tripDetails = { 
        cityName: coordinates.city,
        lat: coordinates.lat,
        lng: coordinates.lng,
        
        temp: weatherDetails.temp,
        weather: weatherDetails.weather,
        icon: weatherDetails.icon,
        
        pageURL: pictureLocation.page,
        photo: pictureLocation.photo }
    res.send(tripDetails)
    
    console.log(geoName);
    console.log(cityName);
    console.log(tripDetails);
})

app.post('/test', async (req, res) => {
    res.json({ pass: 'pass' })
})

console.log(`Your API key is ${process.env.GEONAMES_USERNAME}`)

module.exports = app