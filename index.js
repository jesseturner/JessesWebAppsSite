const express = require('express');
const app = express();
const Datastore = require('nedb');
var natural = require('natural');
const { Classifier } = require('ml-classify-text')

const port = process.env.PORT || 3000; //3000 if locally
app.listen(port, () => {
	console.log('Starting server at ' + port);
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));


//Database Query App
	const database = new Datastore('database.db');
	database.loadDatabase();

	//Save incoming data
	app.post('/api', (request, response) => {
		const data = request.body;
		const timestamp = Date.now();
		data.timestamp = timestamp;
		database.insert(data);
		response.json(data);
		console.log('Post');
	});

	//Send data to client side
	app.get('/api', (request, response) => {
		database.find({}, (err, data) => {
			if (err) {
				response.end();
				return;
			}
			response.json(data);
		});
		console.log('Get');
	});

	//Delete all data
	app.get('/delete', (request, response) => {
		database.remove({}, { multi: true }, function(err, numDeleted) {
	     console.log('Deleted', numDeleted, 'entries');
		});
			response.send('Deleted');
		});

	//Delete specific entry
	app.post('/deletespec', (request, response) => {
		const data = request.body.id; //needs to go to id level so it is just the text
		database.remove({ _id: data }, function(err, numDeleted) {
	     console.log('Deleted', numDeleted, 'entries', data);
		});
			response.send('Deleted');
		});

//Geolocation App
	const locations = new Datastore('locations.db');
	locations.loadDatabase();

	app.post('/locations', (request, response) => {
	const data = request.body;
	const timestamp = Date.now();
	data.timestamp = timestamp;
	locations.insert(data);
	response.json(data);
	console.log('Location logged.');
	});

//Sentiment classifier
	const sentimentdb = new Datastore('sentiment.db');
	sentimentdb.loadDatabase();

	app.post('/sentiment', (request, response) => {
		const data = request.body;
		natural.BayesClassifier.load('nvclassifier_postgres.json',null,function(err,classifier){
			message = data.message;
			const result = classifier.getClassifications(message)[0].label;
			const value = classifier.getClassifications(message)[0].value;
		sentimentdb.insert({ message, result, value }, function(err, newDocs) {
				if (err) {
	    			response.end();
	    			console.log('INSERT error in sentimentdb');
	    		}
	    		response.json(newDocs);
	    		console.log('POST sentiment: ', newDocs);
				});
		});
	});

	app.get('/sentiment/:id', (request, response) => {
		id = request.params.id;
		sentimentdb.find({ _id: id}, function(err, docs) {
	    if (err) {
	    	response.end();
	    	console.log('FIND error in sentimentdb');
	    }
	    response.json(docs);
		});
	});


	// Postgres Database
	const {Pool} = require('pg');
	const pool = new Pool({
	 connectionString: 'postgres://qtagdirbrgqpeb:789820c70809709bbf4f34ed2e8dcc728ae094f2c9409518b913a53838f860da@ec2-52-44-31-100.compute-1.amazonaws.com:5432/d6ghtj6flrhe3e',
	 ssl: {
	 rejectUnauthorized: false
	 }
	});

	app.post('/postgres_api', (request, response) => {
		const data = request.body.firstname;
		pool.query(`INSERT INTO Address(FirstName,LastName,Address) 
			Values('${request.body.firstname}','${request.body.lastname}','${request.body.address}');`, (err, res) => {
	    if (err) {
	        console.log("Postgres API Error - Failed to insert data");
	        console.log(err);
	    }
	    else{
	        console.log("POST success: " + request.body.firstname + " " + request.body.lastname);
	        response.json(res.rows);
	    }
	});
});

	app.get('/postgres_api', (request, response) => {
		pool.query(`SELECT * FROM Address`, (err, res) => {
    	if (err) {
        	console.log("Postgres API Error - Failed to select all from Address");
        	console.log(err);
        	response.end();
			return;
    	}
    	else {
        	console.log("GET postgres success");
        	response.json(res.rows);
    	}
	});
});

	app.post('/postgres_delete', (request, response) => {
		pool.query(`DELETE FROM Address WHERE id = ${request.body.delete_id}`, (err, res) => {
		if (err) {
			console.log("Postgres API Error - Failed to delete from Address");
    		console.log(err);
    		response.end();
			return;
		}
		else {
			console.log("DELETE postgres success");
			response.json(res.rows);
		}

	});
});

	//Sentiment Data API

	app.post('/sentiment_post', (request, response) => {
		var text = request.body.classifiertext;
		var fixed_text = text.replace("'", ""); //Removed because they interfere with query statement
		pool.query(`INSERT INTO Sentiment(text,category) 
			Values('${fixed_text}','${request.body.category}');`, (err, res) => {
	    if (err) {
	        console.log("Sentiment API Error - Failed to insert data");
	        console.log(err);
	    }
	    else{
	        console.log("Sentiment POST success: " + request.body.classifiertext + " - " + request.body.category);
	        response.json(res.rows);
	    }
	});
});
	app.get('/sentiment_get', (request, response) => {
		pool.query(`SELECT * FROM Sentiment ORDER BY id DESC`, (err, res) => {
    	if (err) {
        	console.log("Sentiment API Error - Failed to select all from Sentiment");
        	console.log(err);
        	response.end();
			return;
    	}
    	else {
        	console.log("Sentiment GET success");
        	response.json(res.rows);
    	}
	});
});
	app.post('/sentiment_delete', (request, response) => {
		pool.query(`DELETE FROM Sentiment WHERE id = ${request.body.delete_id}`, (err, res) => {
		if (err) {
			console.log("Sentiment API Error - Failed to delete from Sentiment");
    		console.log(err);
    		response.end();
			return;
		}
		else {
			console.log("Sentiment DELETE success");
			response.json(res.rows);
		}
	});
});
	app.get('/sentiment_train', (request, response) => {

		var classifier = new natural.BayesClassifier();

		pool.query(`SELECT * FROM Sentiment`, (err, res) => { //Replace Address with Sentiment
		if (err) {
			console.log("Sentiment train - Failed to select all from Sentiment");
			console.log(err);
			response.end();
			return;
		}
		else {
			const data = res.rows;

			data.forEach(item=>{
			classifier.addDocument(item.text, item.category);
			})
			classifier.train();
			console.log('Training completed.');

			classifier.save('nvclassifier_postgres.json', function(err,classifier){}); // May need version of this table in postgres

			var raw = JSON.stringify(classifier);
			response.json(raw);
			}
		});
	});


//Raw Classifier Data

	app.get('/rawclassifier_get', (request, response) => {
		natural.BayesClassifier.load('nvclassifier_postgres.json',null,function(err,classifier){

			if (err) {
				console.log("Raw classifier - Failed to load");
				console.log(err);
				response.end();
				return;
			}
			else {
				var raw = JSON.stringify(classifier);
				response.json(raw);
			}
		});
	});

// Brainstorming

	app.post('/brainstorm_post', (request, response) => {
		var text = request.body.idea;
		var fixed_text = text.replace("'", ""); //Removed because they interfere with query statement (probably better way of doing this)
		pool.query(`INSERT INTO Brainstorming(idea,topic,date) 
			Values('${fixed_text}','${request.body.topic}', '${request.body.date}');`, (err, res) => {
	    if (err) {
	        console.log("Brainstorming API Error - Failed to insert data");
	        console.log(err);
	    }
	    else{
	        console.log("Brainstorming POST success: " + request.body.idea + " - " + request.body.topic);
	        response.json(res.rows);
	    }
	});
});
	app.get('/brainstorm_get/:topic', (request, response) => {
		pool.query(`SELECT * FROM Brainstorming WHERE topic = '${request.params.topic}' ORDER BY id ASC`, (err, res) => {
    	if (err) {
        	console.log("Brainstorming API Error - Failed to select " + request.params.topic + " from Brainstorming");
        	console.log(err);
        	response.end();
			return;
    	}
    	else {
        	response.json(res.rows);
    	}
	});
});
	app.post('/brainstorm_delete', (request, response) => {
		pool.query(`DELETE FROM Brainstorming WHERE id = ${request.body.delete_id}`, (err, res) => {
		if (err) {
			console.log("Brainstorming API Error - Failed to delete from Brainstorming");
    		console.log(err);
    		response.end();
			return;
		}
		else {
			response.json(res.rows);
		}
	});
});
	app.get('/brainstorm_get_topics', (request, response) => {
		pool.query(`SELECT topic FROM Brainstorming GROUP BY topic`, (err, res) => {
    	if (err) {
        	console.log("Brainstorming API Error - Failed to select all from Brainstorming");
        	console.log(err);
        	response.end();
			return;
    	}
    	else {
        	response.json(res.rows);
    	}
	});
});

//World Leaders
	app.get('/world_leaders/:id', (request, response) => {
		pool.query(`SELECT * FROM world_leaders WHERE id = '${request.params.id}'`, (err, res) => {
    	if (err) {
        	console.log("World Leaders API Error - Failed to select " + request.params.id + " from world_leaders");
        	console.log(err);
        	response.end();
			return;
    	}
    	else {
        	response.json(res.rows);
    	}
	});
});


//Bitcoin API
/*
// Make Token ------------------ Not needed at the moment ------------------------
	var unirest = require("unirest");

	var req = unirest("POST", "https://bravenewcoin.p.rapidapi.com/oauth/token");

	req.headers({
		"content-type": "application/json",
		"x-rapidapi-key": "8a4df8acb7mshadf58c9c6adaba9p1d6261jsnc86783a27a43",
		"x-rapidapi-host": "bravenewcoin.p.rapidapi.com",
		"useQueryString": true
	});

	req.type("json");
	req.send({
		"audience": "https://api.bravenewcoin.com",
		"client_id": "oCdQoZoI96ERE9HY3sQ7JmbACfBf55RY",
		"grant_type": "client_credentials"
	});

	req.end(function (res) {
		if (res.error) throw new Error(res.error);

		console.log(res.body);
	});// -------------------------------------------------------------------------- 
*/

//Get Price

	app.get('/bitcoin_token', (request, response) => {

		var unirest = require("unirest");

		var req = unirest("POST", "https://bravenewcoin.p.rapidapi.com/oauth/token");

		req.headers({
			"content-type": "application/json",
			"x-rapidapi-key": "8a4df8acb7mshadf58c9c6adaba9p1d6261jsnc86783a27a43",
			"x-rapidapi-host": "bravenewcoin.p.rapidapi.com",
			"useQueryString": true
		});

		req.type("json");
		req.send({
			"audience": "https://api.bravenewcoin.com",
			"client_id": "oCdQoZoI96ERE9HY3sQ7JmbACfBf55RY",
			"grant_type": "client_credentials"
		});

		req.end(function (res) {
			if (res.error) throw new Error(res.error);

			response.json(res.body.access_token);
		});

	app.get('/bitcoin/:token', (request, response) => {

		var unirest = require("unirest");

		var req = unirest("GET", "https://bravenewcoin.p.rapidapi.com/market-cap");

		req.query({
			"assetId": "f1ff77b6-3ab4-4719-9ded-2fc7e71cff1f"
		});

		req.headers({
			"authorization": `Bearer ${request.params.token}`,
			"x-rapidapi-key": "8a4df8acb7mshadf58c9c6adaba9p1d6261jsnc86783a27a43",
			"x-rapidapi-host": "bravenewcoin.p.rapidapi.com",
			"useQueryString": true
		});


		req.end(function (res) {
			if (res.error) throw new Error(res.error);

			response.json(res.body);
		});

	});

});

	app.get('/apod', (request, response) => {

		var unirest = require("unirest");

		//var req = unirest("GET", "https://api.nasa.gov/planetary/apod");
		var req = unirest("GET", "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
		

		req.end((res) => {
			if (res.error) throw new Error(res.error);

			response.json(res);
		})
	})



