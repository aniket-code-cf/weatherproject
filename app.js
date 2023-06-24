const express=require("express");

const bodyParser=require("body-parser");


const https=require("https");
const app=express();


app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
    

});


app.post("/",function(req,res)
{
    console.log(req.body.cityName);

  const query=req.body.cityName;
  const apikey="d0188cffa6330fd990b52710484ba905"
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;

  https.get(url,function(response)
  {
      console.log(response.statusCode);

      response.on("data",function(data)
      {
          const weatherData=JSON.parse(data);
          const temp=weatherData.main.temp;
          const weatherDescription=weatherData.weather[0].description;
          const icon=weatherData.weather[0].icon;
          const imageURL= "https://openweathermap.org/img/wn/"+icon+"@2x.png";
          

          res.write("<p>The weather is currently" +weatherDescription+"</p>");
          res.write("<h1>The temperature of "+query+" is"+temp+"degree</h1>");
          res.write("<img src="+imageURL+">");
          res.send();



      });

  });


});



app.listen(3000,function()
{
    console.log("Server is running on 3000");

});

 /*const url="https://api.openweathermap.org/data/2.5/weather?q=London&appid=d0188cffa6330fd990b52710484ba905&units=metric"
    https.get(url,function(response)
    {
        console.log(response.statusCode);

        response.on("data",function(data)
        {
            const weatherData=JSON.parse(data)
            const temp=weatherData.main.temp
            const weatherDescription=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imageURL= "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            

            res.write("<p>The weather is currently" +weatherDescription+"</p>")
            res.write("<h1>The temperature of London is"+temp+"degree</h1>");
            res.write("<img src="+imageURL+">")
            res.send();



        })

    })

*/