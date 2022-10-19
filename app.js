const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html")
});

app.post("/",function(req,res){
 const query=req.body.cityName;
 const apiKey="842e18b995d21a5b439d7824f2304133";
 const unit="metric";
 const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=842e18b995d21a5b439d7824f2304133&units=metric";
 https.get(url,function(response){

     response.on("data",function(data){
        const weatherData=JSON.parse(data)
        const temp=weatherData.main.temp
        const weatherDescription=weatherData.weather[0].description
        const icon=weatherData.weather[0].icon
        const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<p>The weather description is "+weatherDescription+".</p>");
        res.write("<h1>The temperature in "+query+" is "+ temp +" degrees.</h1>");
        res.write("<image src=" + imageURL+">");
        res.send()
     })
    })
 })

    
    
app.listen(3000, function(){
    console.log("server is running on port 3000.")
})