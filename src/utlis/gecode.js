const request = require('request');

const geocode = (address,callback) =>{
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJoaWplZXQ4MDkwIiwiYSI6ImNreWZ0ZmpyMjBwZ3MydnM4Znhudmk0ODMifQ.Aka3T5xOAVUpLu56QLX2BA&limit=1'
    
    request({url: url,json:true}, (err,res)=>{
        if(err){
            callback("Unable to connect address",undefined);
        }else if(res.body.features.length === 0){
            callback("Unable to find location",undefined)
        }else{
             
           callback(undefined,{
               latitude: res.body.features[0].center[0],
               longtitude :  res.body.features[0].center[1],
               location : res.body.features[0].place_name
           }) 
        }
    
    })
    
    }
    

    module.exports = geocode;
    
    
    