"use strict";

var messageone = document.querySelector('#msg-1');
var messagetwo = document.querySelector('#msg-2');
var weatherform = document.querySelector('form');
var search = document.querySelector('input');
weatherform.addEventListener('submit', function (e) {
  e.preventDefault();
  var location = search.value;
  messageone.textContent = 'Loading';
  messagetwo.textContent = '';
  fetch('/weather?address=' + location).then(function (response) {
    response.json().then(function (data) {
      if (data.err) {
        messageone.textContent = data.error;
      } else {
        messageone.textContent = data.location;
        messagetwo.textContent = data.forcast;
      }
    });
  });
});