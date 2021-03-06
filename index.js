var express = require('express');
var fs = require('fs');

var port = 9009;
var app = express();

var countries = require('./data/countries.json');

app.get('/countries', function(req, res) {
  res.type('application/json');

  var query = req.query.q;

  var filteredCountries;

  if (query) {
    filteredCountries = countries.filter(function(country) {
      return country.name.common.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  } else {
    filteredCountries = countries;
  }

  if (!filteredCountries) {
    res.statusCode = 404;
    return res.send('No countries found with query ' + query + '!');
  } else {
    res.statusCode = 200;
    return res.send(JSON.stringify(filteredCountries));
  }
});

app.listen(port);
console.log('Application started on port ' + port);