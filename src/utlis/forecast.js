const request = require("request")


const forecast = (lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=9c0834239437e334ec3dfccf228da36d&query='+lat+','+long+'&units=f'

request({url: url,json: true},(err,res)=>{
    if(err){
        callback('Unable to connect lat and long: '+err,undefined)
    }else if(res.body.err){
        callback('long or lat is not found',undefined)
    }else{
       
        callback(undefined,{
            lat: res.body.location.lat,
            long: res.body.location.lon,
        })

    }

})

}



module.exports = forecast;  