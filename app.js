const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {


    const query = req.body.CityName;;
    const apikey = "77fda55bbb5ac7f41a94f5625240316c";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    https.get(url, function(response) {
            console.log(response.statusCode);
            response.on("data", function(data) {
                const weatherData = JSON.parse(data)
                    // const feels_like = weatherData.main.feels_like
                    // console.log(feels_like);
                const temp = weatherData.main.temp
                    // console.log(temp);
                const weatherDescription = weatherData.weather[0].description
                    // console.log(weatherDescription);
                const icon = weatherData.weather[0].icon
                const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
                res.write("<h1>the tem of " + query + " is " + temp + " Degree celcius</h1>");
                res.write("The weather is curently " + weatherDescription);
                res.write("<img src=" + imageURL + ">");
                res.send()
            })
        })
        // res.send("server is running");

});
app.listen(3000, function() {
    console.log("Server started on port 3000");
});