const request = require("request");
const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmVybWFndjE0OTQiLCJhIjoiY2szNWh4cGxtMDRzZDNsbnM1eDJsZzE2bSJ9.IBddxyPYToIj6JJPnA2jaA';
request({url, json: true}, (error, {body}={})=>{
    if(error){
        callback('Can not connect to webservice', undefined);
    } else if(body.features.length===0){
        callback('The format is not correct', undefined);
    } else {
        callback(undefined, {
            latitude:  body.features[0].center[1],
            longitude: body.features[0].center[0],
            location:  body.features[0].place_name
        });
    }
})
}
module.exports = geocode;