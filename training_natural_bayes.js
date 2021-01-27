var natural = require('natural');
var classifier = new natural.BayesClassifier();


//Training Data
const data = require('./training_data.json');

data.forEach(item=>{
	classifier.addDocument(item.text, item.category);
	})

//Train
classifier.train();
console.log('Training completed.');


//Save
classifier.save('nvclassifier.json', function(err,classifier){});

var raw = JSON.stringify(classifier);
console.log(raw);