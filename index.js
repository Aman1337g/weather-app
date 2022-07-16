const express = require('express')
const bodyParser = require('body-parser')
const request = require('request');
const { json } = require('body-parser');

const app = express()

const apikey = "0d40c89faab24fa2c0063a2142ddca74";

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('index', {weather: null, error: null})
})

app.post('/',function(req,res) {
    let city = req.body.city
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    console.log(req.body.city);
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', {weather: null, error: 'Error, please try again'})
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', {
                    weather: null,
                    error: 'Error, please try again'
                })
            } else {
                let weatherText = `It's ${weather.main.temp} degress Celcius with ${weather.weather[0].main} in ${weather.name}!`
                res.render('index', {weather: weatherText, error: null})
                console.log("body:", body);
            }         
        }
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Weaherly app listening on port 3000!");
});
