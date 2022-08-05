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
// Initialize the main project folder
app.use(express.static('dist'));

// app.listen(8000, function () {
//     console.log('Example app listening on port 8000!');
// })

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
})
// const date = req.body.date;

// let tripDetails = {}

app.post('/trip', async (req, res) => {
    const cityName = req.body.city
    const apiKey = process.env.GEONAMES_USERNAME;
    const geoName = `http://api.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${apiKey}`
    
    await (fetch(encodeURI(geoName)) 
    .then(response => response.json())
    .then(data => res.send( {
        city: data.geonames[0].name,
        lat: data.geonames[0].lat,
        lng: data.geonames[0].lng
    }))
    .catch(err => {
        console.log(err)
    }))
    console.log(geoName);
    console.log(cityName);
}) 


// console.log(cityName);
// Setup Server

const port = 8000;
const server = app.listen(port, listening)
function listening() {
    console.log(`Server running on port: ${port}`)
}
console.log(`Your API key is ${process.env.GEONAMES_USERNAME}`)

module.exports = app