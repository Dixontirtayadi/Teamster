var express = require('express')
var app = express();
var database = require('./utils/database');
var path = require('path');
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + `/webpage`));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/webpage/index.html'));
  res.end;
})
app.get('/hi', function (req, res) {
  res.send('Hello');
  res.end;
})

app.get('/class', function (req, res) { //enters if user put in classID in start page
  var info = req.query;
  res.sendFile(path.join(__dirname + '/webpage/memberInfo.html'));
  res.end;
})

app.get('/class/students', function (req, res) { //enters if student enters userId and email
  var info = req.query;
  // console.log("student = " + info);
  if (database.addStudent(info.cID, info.sID, info.sEMAIL) == "doesn't exist!") {
    res.sendFile(path.join(__dirname + '/404'));
  } else {
    if(database.getStatus == "off") {
      res.sendFile(path.join(__dirname + '/webpage/waitingroom.html'));
    } else if (database.getStatus == "short") {
      res.sendFile();
    } else {
      res.sendFile(path.join(__dirname + '/webpage/murdermystery.html'));
    }
  }
  res.end;
})

app.get('/class/teachers/game', function (req, res) { //enters when create room is entered. Choose game here
  var info = req.query;
  // console.log("student = " + info);
  // if (!database.addClass(info.cID) == "exists!") {
    database.addClass(info.cID);
    res.sendFile(path.join(__dirname + '/webpage/gameDuration.html'));
  // }
  res.end;
})

// Helene
app.get('/class/students/murdermystery', function (req, res) { //classID=...&studentID=...&answers
  var info = req.query;

  console.log("murdermystery game is running");
  res.sendFile(path.join(__dirname + '/webpage/murdermystery.html'));
  //res.send(printMap());
  res.end;
})
// Helene

app.get('/getData', function (req, res) { //classID=...&studentID=...&answers
  res.send(printMap());
})

function printMap() {
  let jsonObject = {};
  database.data.forEach((value, key) => {
      jsonObject[key] = value
  });
  return (JSON.stringify(jsonObject));
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
