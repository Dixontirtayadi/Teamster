var express = require('express')
var app = express();
var database = require('./webpage/database');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send("home page");
  res.end;
})
app.get('/hi', function (req, res) {
  res.send('Hello');
  res.end;
})

app.get('/student', function (req, res) {
  var info = req.query;
  console.log(database.addClass(info.classID));
})

app.listen(3000);