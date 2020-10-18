const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const Q = require('q');  

async function analyzeText(text) {
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

async function analyzeUsers(users, sentimentTemp) {
  const promises = [];
  for (let i = 0; i < users.length; i++) {
    // let id = users[i].sID;
    // sentiments[id] = analyzeText(users[i].responses);
    sentimentTemp[i] = analyzeText(users[i]);
    promises.push(sentimentTemp[i]);
  }
  return sentimentTemp;
}

await function formGroups(users, maxGroup) {
  var trial = ["I love ice cream", "asdqwdn", "I hate this hw", "Is it raining now?"];
  var sentiments = []
  analyzeUsers(trial, sentiments);
  Q.all(sentiments).then(function() {
    console.log(sentiments);
    return groups;
  });
}

formGroups();