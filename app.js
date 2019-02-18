var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var apiKey = "03ae058bc965607200dd32337cb1f95b";

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index", {weather:null, error:null});
})

app.post("/", function(req, res) {
    var city = req.body.city;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function(err, response, body){
        if(err) {
            res.render("index", {weather: null, error: "Error, please try again"});
        }
        else {
            var weather = JSON.parse(body);
            if(weather.main == undefined) {
                res.render("index", {weather: null, error: "Error, please try again"});            
            }
            else {
                var temCelcius = Math.round(((weather.main.temp - 32) * 5/9));
                
                var weatherText1 = `${temCelcius}`;
                var weatherText2 = `${weather.name}`;
                
                let weatherText = `It's ${temCelcius} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null, weatherTemp: weatherText1, weatherName: weatherText2});
            }
        }
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`App started on port ${port}`);
});


