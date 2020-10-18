var express = require('express')
var app = express();
var database = require('./utils/database');
var path = require('path');
var grouper = require('./utils/groups');
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
    const status = database.getStatus(info.cID);
    console.log(status);
    if(status === "off") {
      console.log("1");
      res.sendFile(path.join(__dirname + '/webpage/waitingroom.html'));
    } else if (status === "short") {
      console.log("2" + status);
      res.sendFile(path.join(__dirname + '/webpage/questions.html'));
    } else {
      console.log("3");
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
    console.log("HERE");
    res.sendFile(path.join(__dirname + '/webpage/gameDuration.html'));
  // }
  res.end;
})

app.get('/class/teachers/game/short', function (req, res) { //enters when short game is chosen
  var info = req.query;
  // console.log("student = " + info);
  // if (!database.addClass(info.cID) == "exists!") {
  database.turnOn(info.cID, "short");
  console.log("turned " + info.cID + " " + database.getStatus(info.cID));
  res.sendFile(path.join(__dirname + '/webpage/waitingForResponses.html'));
  // }
  res.end;
})

app.get('/submit', function (req, res) {
  var info =  req.query;
  database.addAnswer(info.cID, info.sID, info.answer);
  res.sendFile(path.join(__dirname + '/webpage/thankYou.html'))
  res.end;
})

// Helene
app.get('/class/students/murdermystery', function (req, res) { //classID=...&studentID=...&answers
  var info = req.query;
  console.log("murdermystery game is running");
  res.sendFile(path.join(__dirname + '/webpage/murdermystery.html'));
  res.end;
})
// Helene

app.get('/analyzeResult', function (req, res) { //classID=...&groupSize=...
  res.sendFile(path.join(__dirname + "/webpage/breakoutSize.html"));
  res.end;
})

app.get('/analyze', function(req, res) {
  res.sendFile(path.join(__dirname + "/webpage/loadingresults.html"));
})

app.get('/getData', function (req, res) {
  res.send(printMap());
})

app.get('/formGroups', function (req, res) { //classID=...&groupSize=...
  var cid = req.query.classID;
  var groupSize = 2;
  grouper(database.data.get(cid), groupSize).then((group) => {
    res.send(group);
  });
  res.end;
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

