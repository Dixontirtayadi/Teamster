const language = require('@google-cloud/language');
const { async } = require('q');
const client = new language.LanguageServiceClient();
const Q = require('q');  

// Call sentiment analysis
// Params: User Object which has uID and Responses
// Return: {uID: ..., sent: {score:..., magnitude:...}}
async function analyzeText(user) {
  const text = user;
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the document
  const [result] = await client.analyzeSentiment({document});

  const sentiment = result.documentSentiment;
  console.log('Document sentiment:');
  console.log(text);
  console.log(`  Score: ${sentiment.score}`);
  console.log(`  Magnitude: ${sentiment.magnitude}`);
  return sentiment;

  // const sentences = result.sentences;
  // sentences.forEach(sentence => {
  //   console.log(`Sentence: ${sentence.text.content}`);
  //   console.log(`  Score: ${sentence.sentiment.score}`);
  //   console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  // });
}

async function analyzeOneUser(user) {
  const myPromise = new Promise((resolve, reject) => {
    var sentArr = []
    for (let i = 0; i < user.responses.length; i++) {
      sentArr[i] = analyzeText(user.responses[i]);
    }  
    Q.all(sentArr).then(function() {
      let sentiment = {magnitude: 0, score: 0};
      for (let i = 0; i < sentArr.length; i++) {
        sentiment.magnitude += sentArr[i].magnitude;
        sentiment.score += sentArr[i].score;
      }
      resolve({userID: user.sID, sent: sentiment});
    });  
  });
  return myPromise;

}

// Make the analyze call parallel for each user
// return an array of Promises object which will
// resolve to {uID: ..., sent: {score:..., magnitude:...}}
async function analyzeUsers(users, sentimentTemp) {
  for (let i = 0; i < users.length; i++) {
    // sentimentTemp[i] = analyzeText(users[i]);
    sentimentTemp[i] = analyzeOneUser(users[i]);
  }
}

// Params: array of users and a maximum number of group to make
// Return: Grouping of the user 
function formGroups(users, groupSiz) {
  const myPromise = new Promise((resolve, reject) => {
    var groupSize = 2;
    // var trial = ["I love ice cream", "asdqwdn", "I hate this hw", "Is it raining now?"];
    var trial = [{sID: "1", responses: ["I love ice cream", "I love dogs"]}, {sID: "2", responses: ["I hate ice cream", "I hate dogs"]}]
    var groups = [];
    var sentiments = [];
    analyzeUsers(trial, sentiments);
    Q.all(sentiments).then(function() {
      // console.log(sentiments);
      sentiments.sort(compareSent);
      console.log(sentiments);
      groups = assignGroupFromSentiment(sentiments, groupSize);
      // Testing
      for (let i = 0; i < groups.length; i++) {
        console.log("groups: " + groups[i]);
      }
      resolve(groups);
    });  
  });
  return myPromise;
}

// Assign the grouping per index to the groups array
async function assignGroupFromSentiment(sentiments, groupSize) {
  var groups = [];
  for (let i = 0; i < sentiments.length; ) {
    console.log(i);
    let j = i + groupSize;
    let group = [];
    while (i < j) {
      group.push(sentiments[i].userID);
      i++;
    }
    groups.push(group);
  }
  return groups;
}

function compareSent(a, b) {
  var scA = a.sent.score;
  var scB = b.sent.score;
  if (scA === scB) {
    var magA = a.sent.magnitude;
    var magB = b.sent.magnitude;
    if (magA < magB) {
      return -1;
    } else {
      return 1;
    }
  } else if (scA < scB) {
    return -1;
  } else {
    return 1;
  }
}

module.exports = formGroups