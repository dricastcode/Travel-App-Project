// Setup empty JS object to act as endpoint for all routes
import('node-fetch')

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

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
// const date = req.body.date;

app.post('/trip', function (req, res) {
    const city = req.body.city;
    const geoNameData = `https://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`;

    fetch(geoNameData, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }) .then((response) => {
        return response.json()
        }) .then((data) => {
            res.send({
                city: data.geonames.name,
                lat: data.geonames.lat,
                lng: data.geonames.lng,
            })
            console.log(data);
        })
    })

// Setup Server

const port = 8000;
const server = app.listen(port, listening)
function listening() {
    console.log(`Server running on port: ${port}`)
}
console.log(`Your API key is ${process.env.GEONAMES_USERNAME}`)