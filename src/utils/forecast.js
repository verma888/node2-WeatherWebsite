const request = require("request");


const getForecast = (lat,long, callback)=>{
    const url ='https://api.darksky.net/forecast/0bbdafab0f01ff69a408107cae73740e/'+lat+','+long+'?units=si';
    request({url, json: true}, (error, {body}={})=>{
        if(error){
            callback('Unable to connect with webservices', undefined);
        } else if(body.error){
            callback('Incorrect cordinates. Please try with another.',undefined );
        } else{
            callback(undefined, body.daily.summary + 'Current temprature is '+ body.currently.temperature + ' degree celsius.The highest temprature will go to '+ body.daily.data[0].temperatureHigh + ' degree celsius and lowest it can go to '+body.daily.data[0].temperatureLow +' degree celsius in midnight.' )
        }
    })

}
module.exports = getForecast;