let data = new Map(); //key: classID, value: object with student name, email, answers

function addClass(classID) {
  // console.log("ID is" + classID);
  if (!data.has(classID)){
    data.set(classID, []);
  } else {
    return ("exists!");
  }
}

function addStudent(classID, sName, sEmail, sAnswers) {
  if (data.has(classID)) {var input = {name: sName, email: sEmail, answers: sAnswers};
    var repeat = false;
    for (var i = 0; i < data.get(classID).length; i++){
      console.log("equals?    " + isEqual(data.get(classID)[i], input))
      repeat = repeat || isEqual(data.get(classID)[i], input);
    }

    console.log(repeat);
    if(!repeat) {
      data.get(classID).push({name: sName, email: sEmail, answers: sAnswers});
    }
  } else {
    return ("doesn't exist!");
  }
  console.log(printMap())
}

function isEqual(a, b) {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
      return false;
  }

  for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
          return false;
      }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}

function printMap() {
  let jsonObject = {};
  data.forEach((value, key) => {
      jsonObject[key] = value
  });
  return (JSON.stringify(jsonObject));
}

module.exports.addClass = addClass; //send to other files
module.exports.addStudent = addStudent;
module.exports.data = data;
module.exports.show = printMap;