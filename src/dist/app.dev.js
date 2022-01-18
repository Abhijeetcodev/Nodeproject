"use strict";

var express = require('express');

var path = require('path');

var hbs = require('hbs');

var viewPath = path.join(__dirname, '../templates/views');
var partialPath = path.join(__dirname, '../templates/partials');
var app = express();

var forecast = require('./utlis/forecast');

var geocode = require('./utlis/gecode');

hbs.registerPartials(partialPath);
var publicpath = path.join(__dirname, '../public');
app.set("view engine", 'hbs');
app.set('views', viewPath);
app.use(express["static"](publicpath));
app.get('', function (req, res) {
  res.render('index', {
    title: 'Weather app',
    name: 'Abhijeet '
  });
});
app.get('/about', function (req, res) {
  res.render('about', {
    name: 'About',
    title: 'hello'
  });
});
app.get('/help', function (req, res) {
  res.render('help', {
    name: 'Abijeet',
    msg: 'I need help'
  });
});
app.get('/products', function (req, res) {
  if (!req.query.address) {
    return res.send({
      error: ' you must provide a address'
    });
  }

  console.log(req.query.address);
  res.send({
    products: []
  });
});
app.get('/weather', function (req, res) {
  var address = req.query.address;

  if (!address) {
    return res.send({
      error: ' you must provide a address'
    });
  } else {
    geocode(address, function (error) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          latitude = _ref.latitude,
          longitude = _ref.longitude,
          location = _ref.location;

      if (error) {
        return console.log(error);
      }

      forecast(latitude, longitude, function (error, forecastData) {
        if (error) {
          return console.log(error);
        }

        res.send({
          location: location,
          forecast: forecastData,
          address: address
        });
      });
    });
  }
});
app.get('/help/*', function (req, res) {
  res.render('404page');
});
app.get("*", function (req, res) {
  res.render('404page');
});
app.listen(3000, function () {
  console.log('Server is up on port 3000,');
});