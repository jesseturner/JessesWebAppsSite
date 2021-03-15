const express = require('express');
const app = express();
const Datastore = require('nedb');
var natural = require('natural');

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
			const result = classifier.classify(message);
		sentimentdb.insert({ message, result }, function(err, newDocs) {
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
		console.log('GET sentiment with Id: ', id);
		sentimentdb.find({ _id: id}, function(err, docs) {
	    if (err) {
	    	response.end();
	    	console.log('FIND error in sentimentdb');
	    }
	    response.json(docs);
	    console.log('GET sentiment: ', docs);
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
		pool.query(`SELECT * FROM Address;`, (err, res) => {
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

	//Sentiment Table API

	app.post('/sentiment_post', (request, response) => {
		pool.query(`INSERT INTO Sentiment(text,category) 
			Values('${request.body.classifiertext}','${request.body.category}');`, (err, res) => {
	    if (err) {
	        console.log("Sentiment API Error - Failed to insert data");
	        console.log(err);
	    }
	    else{
	        console.log("Sentiment POST success: " + request.body.classifiertext + " " + request.body.category);
	        response.json(res.rows);
	    }
	});
});
	app.get('/sentiment_get', (request, response) => {
		pool.query(`SELECT * FROM Sentiment;`, (err, res) => {
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

		pool.query(`SELECT * FROM Sentiment;`, (err, res) => { //Replace Address with Sentiment
		if (err) {
			console.log("Sentiment train - Failed to select all from Sentiment");
			console.log(err);
			return;
		}
		else {
			console.log(res.rows); //Returns in JSON format! Just as needed. 
			const data = res.rows;

			data.forEach(item=>{
			classifier.addDocument(item.text, item.category);
			})
			classifier.train();
			console.log('Training completed.');

			classifier.save('nvclassifier_postgres.json', function(err,classifier){});

			var raw = JSON.stringify(classifier);
			console.log(raw);
			}
		}); 
	});

