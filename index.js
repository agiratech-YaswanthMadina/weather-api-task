const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();

const api_key = process.env.api_key;

const port = 3033;
const a = 10;
app.get('/', function (req, res) {
    const address = req.query.address;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${api_key}`;

    axios.get(url)
        .then(response => {
            const data = response.data;
            const cityName = data.name;
            const temperature = data.main.temp;
            const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            const message = `City Name: ${cityName}<br>Temperature: ${temperature}&deg;C<br>Sunset Time: ${sunsetTime}`;

            res.send(`<html><body><div id='container'><h1>${message}</h1></div></body></html>`);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error occurred while fetching weather data');
        });
});

app.listen(port, function () {
    console.log("application is running");
})