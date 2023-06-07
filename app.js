const express =require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();


app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");

    
    app.post("/", function(req,res){
        const apikey= "c94b1805c513f240e89d655a46911de3";
        const city= req.body.cityname;
        const unit="metric";
        const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit +"&appid=" + apikey +"";
        https.get(url,function(response){
            console.log(response.statusCode);
            response.on("data",function(data){
                const weatherreport= JSON.parse(data);
                const temp= weatherreport.main.temp;
                const a=weatherreport.weather[0].description;
                const icon=weatherreport.weather[0].icon;
                const imageurl="https://openweathermap.org/img/wn/" + icon + "@2x.png"
                res.write("<p>weather-report currently " + a +" </p>");
                res.write("<h1>the temperature in " + city + " is: " + temp + " degree celsius</h1>");
                res.write("<img src=" + imageurl + ">");
                res.send();
                
                
            });
    });
        
    });

});




app.listen(3000,function(){
    console.log("server is running on port 3000");
});