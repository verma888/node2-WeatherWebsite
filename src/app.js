const path = require('path');
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const getForecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000
//define path for express config
const htmlpath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partailsPath = path.join(__dirname,'../templates/partials');

//setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partailsPath)

//set up static directory to serve
app.use(express.static(htmlpath));

app.get('/', (req, res)=>{
    res.render('index', {
        title : 'Weather App',
        name : 'Gourav Verma'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'This is about me',
        name : 'Gourav Verma'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        contact : '9828094587 & vermagv1494@gmail.com',
        title : 'HELP',
        name : 'Gourav Verma'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "Please provide the address"
        });
    }
    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error});
        }

        getForecast(latitude,longitude, (err, forecastData)=>{
            if(err){
                return res.send({err});
            }
            res.send({
                location : location,
                Forecast : forecastData,
                address : req.query.address
            });
            })
    });
})

app.get('/help/*', (req,res)=>{
    res.render("404", {
        name : 'Gourav Verma', 
        title : 'Help article not found'
    });
})

app.get('/*',(req, res)=>{
    res.render('404',{
        name : 'Gourav Verma',
        title: 'ERROR'
    });
})

app.listen(port, ()=>{
    console.log(`server is up at port ${port}`);
})