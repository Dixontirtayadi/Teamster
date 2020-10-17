let data = new Map(); //key: classID, value: object with student name, email, answers

function addClass(classID) {
  console.log("ID is" + classID);
  if (!data.has(classID)){
    data.set(classID, []);
  } else {
    return ("exists!");
  }
}

function addStudent(classID, sName, sEmail, sAnswers) {
  if (data.has(classID)) {
    data.get(classID).push({name: sName, email: sEmail, answers: sAnswers});
  } else {
    return ("doesn't exist!");
  }
}

module.exports.addClass = addClass; //send to other files
module.exports.addStudent = addStudent;

