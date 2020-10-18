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

app.get('/class', function (req, res) {
  var info = req.query;
  // console.log(database.addClass(info.cID));
  // console.log("class = " + info);
  // res.send(printMap(info.data));
  res.sendFile(path.join(__dirname + '/webpage/memberInfo.html'));
  res.end;
})

app.get('/class/students', function (req, res) { //classID=...&studentID=...&answers
  var info = req.query;
  // console.log("student = " + info);
  if (database.addStudent(info.cID, info.sID, info.sEMAIL) == "doesn't exist!") {
    res.sendFile(path.join(__dirname + '/404'));
  } else {
    res.sendFile(path.join(__dirname + '/webpage/waitingroom.html'));
  }
  res.end;
})

app.get('/class/teachers/game', function (req, res) { //classID=...&studentID=...&answers
  var info = req.query;
  // console.log("student = " + info);
  if (!database.addClass(info.cID) == "exists!") {
    res.sendFile(path.join(__dirname + '/webpage/gameDuration.html'));
  }
  res.end;
})

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