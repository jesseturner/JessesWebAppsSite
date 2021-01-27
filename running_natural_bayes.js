var natural = require('natural');
const prompt = require('prompt');

prompt.start();

prompt.get(['Tweet'], function (err, result) {
    if (err) { return onErr(err); }
    natural.BayesClassifier.load('nvclassifier.json',null,function(err,classifier){
	console.log(classifier.classify(result.Tweet));
	})
});

function onErr(err) {
    console.log(err);
    return 1;
}

