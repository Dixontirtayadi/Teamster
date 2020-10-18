const language = require('@google-cloud/language');
const { async } = require('q');
const client = new language.LanguageServiceClient();
const Q = require('q');  

// Call sentiment analysis
// Params: text to analyze
// Return: the sentiment score and magnitude
async function analyzeText(text) {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the document
  const [result] = await client.analyzeSentiment({document});

  const sentiment = result.documentSentiment;
  // console.log('Document sentiment:');
  // console.log(text);
  // console.log(`  Score: ${sentiment.score}`);
  // console.log(`  Magnitude: ${sentiment.magnitude}`);
  return sentiment;

  // const sentences = result.sentences;
  // sentences.forEach(sentence => {
  //   console.log(`Sentence: ${sentence.text.content}`);
  //   console.log(`  Score: ${sentence.sentiment.score}`);
  //   console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  // });
}

// Parallelize API calls within user and sum up the sentiments score and magnitude
// return {userID: ..., sent:{score:..., magnitude:...}
async function analyzeOneUser(user) {
  const myPromise = new Promise((resolve, reject) => {
    var sentArr = []
    var responses = user.answer.split("|");
    for (let i = 0; i < responses.length; i++) {
      sentArr[i] = analyzeText(responses[i]);
    }  
    Q.all(sentArr).then(function() {
      let sentiment = {magnitude: 0, score: 0};
      for (let i = 0; i < sentArr.length; i++) {
        sentiment.magnitude += sentArr[i].magnitude;
        sentiment.score += sentArr[i].score;
      }
      resolve({email: user.email, name: user.name, sent: sentiment});
    });  
  });
  return myPromise;

}

// Make the analyze call parallel for each user
async function analyzeUsers(users, sentimentTemp) {
  const myPromise = new Promise((resolve, reject) => {
    var sentimentTemp = [];
    for (let i = 0; i < users.length; i++) {
      sentimentTemp.push(analyzeOneUser(users[i]));
    }
    Q.all(sentimentTemp).then(function() {
      resolve(sentimentTemp);
    });  
  });
  return myPromise;
}

// Params: array of users and a maximum number of group to make
// Return: Grouping of the user 
function formGroups(users, groupSiz) {
  console.log("FormGroups called");
  const myPromise = new Promise((resolve, reject) => {
    var groupSize = 2;
    var groups = [];
    var sentiments = analyzeUsers(users, sentiments);
    sentiments.then((data) => {
      data.sort(compareSent);
      groups = assignGroupFromSentiment(data, groupSize);
      // Testing
      for (let i = 0; i < groups.length; i++) {
        console.log("groups: " + JSON.stringify(groups[i]));
      }
      resolve(groups);
    });
  });
  return myPromise;
}

// Assign the grouping per index to the groups array
function assignGroupFromSentiment(sentiments, groupSize) {
  var groups = [];
  for (let i = 0; i < sentiments.length; ) {
    // console.log(i);
    let j = i + groupSize;
    let group = [];
    while (i < j) {
      if (i >= sentiments.length) {
        break;
      }
      group.push({email: sentiments[i].email, name: sentiments[i].name});
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