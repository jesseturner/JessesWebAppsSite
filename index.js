const express = require('express');
const app = express();
const Datastore = require('nedb');
app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));


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

//Run classifier

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
