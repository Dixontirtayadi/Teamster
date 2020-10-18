const language = require('@google-cloud/language');
const { async } = require('q');
const client = new language.LanguageServiceClient();
const Q = require('q');  

// Call sentiment analysis
// Params: User Object which has uID and Responses
// Return: {uID: ..., sent: {score:..., magnitude:...}}
async function analyzeText(user) {
  const text = user.responses;
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
  return {userID: user.sID, sent: sentiment};

  // const sentences = result.sentences;
  // sentences.forEach(sentence => {
  //   console.log(`Sentence: ${sentence.text.content}`);
  //   console.log(`  Score: ${sentence.sentiment.score}`);
  //   console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  // });
}

// Make the analyze call parallel for each user
// return an array of Promises object which will
// resolve to {uID: ..., sent: {score:..., magnitude:...}}
async function analyzeUsers(users, sentimentTemp) {
  // const promises = [];
  for (let i = 0; i < users.length; i++) {
    sentimentTemp[i] = analyzeText(users[i]);
    // promises.push(sentimentTemp[i]);
  }
  return sentimentTemp;
}

// Params: array of users and a maximum number of group to make
// Return: Grouping of the user 
async function formGroups(users, maxGroup) {
  // var trial = ["I love ice cream", "asdqwdn", "I hate this hw", "Is it raining now?"];
  var trial = [{sID: "1", responses: "I love ice cream"}, {sID: "2", responses: "I hate ice cream"}]
  var sentiments = []
  var groups = [];
  analyzeUsers(trial, sentiments);
  Q.all(sentiments).then(function() {
    console.log(sentiments);
    sentiments.sort(compareSent);
    console.log(sentiments);
    assignGroupFromSentiment(sentiments, maxGroup, groups);
    return groups;
  });  
}

// Assign the grouping per index to the groups array
function assignGroupFromSentiment(sentiments, maxGroup, groups) {
  
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

formGroups();