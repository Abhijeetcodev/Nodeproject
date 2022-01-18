const express = require('express')
const path = require('path')

const hbs = require('hbs')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
const app = express()
const forecast = require('./utlis/forecast');
const geocode = require('./utlis/gecode');
const port = process.env.PORT || 3000

hbs.registerPartials(partialPath)

const publicpath = path.join(__dirname,'../public')

app.set("view engine",'hbs')

app.set('views',viewPath)
app.use(express.static(publicpath))



app.get('',(req,res)=>{

    res.render('index',{
        title: 'Weather app',
        name:'Abhijeet '
    })
})

app.get('/about',(req,res)=>{
    res.render('about',
    {
        name: 'About',
        title: 'hello'
    })
})
app.get('/help',(req,res)=>{

    res.render('help',{
        name: 'Abijeet',
        msg: 'I need help'
    })
})

app.get('/products',(req,res)=>{

    if(!req.query.address){
          
       return res.send({
           error: ' you must provide a address'
       }) 
    }
    console.log(req.query.address);
    res.send({
        products: []
    })
})

app.get('/weather',(req,res)=>{

    const address = req.query.address;
    
    if(!address){
          
        return res.send({
            error: ' you must provide a address'
        }) 
     }else {
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return console.log(error)
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return console.log(error)
                }
                
                res.send({
                    location:location,
                    forecast: forecastData,
                    address
                })
            })      
        })
    }

})

   

app.get('/help/*',(req,res)=>{
    res.render('404page')
   
})

app.get("*",(req,res)=>{
    res.render('404page')

})

app.listen(port,()=>{
    console.log('Server is up on port 3000,')
})