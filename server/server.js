// Setup empty JS object to act as endpoint for all routes
const appData = {};

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
app.use(express.static('website'));

app.get('allData', sendData);

function sendData(req, res) {
    res.send(appData);
}

app.post('/addData', addData);

function addData(req, res) {
    let data = req.body;
    console.log('Server data', data);
    if (data) {
        projectData.temp = data.temp;
        projectData.date = data.date;
        projectData.city = data.name;
        projectData.feel = data.feelings;
    }
    res.send(addData);
}

// Setup Server

const port = 8000;
const server = app.listen(port, listening)
function listening() {
    console.log(`Server running on port: ${port}`)
}