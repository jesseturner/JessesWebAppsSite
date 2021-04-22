// Testing Postgres Database

const {Pool} = require('pg');
const pool = new Pool({
 connectionString: 'postgres://qtagdirbrgqpeb:789820c70809709bbf4f34ed2e8dcc728ae094f2c9409518b913a53838f860da@ec2-52-44-31-100.compute-1.amazonaws.com:5432/d6ghtj6flrhe3e',
 ssl: {
 rejectUnauthorized: false
 }
});


//Running SQL commands to Postgres DB
//Command-Line Postgres SQL is not yet set up

// Create new table
/*
pool.query(`CREATE TABLE Brainstorming(id SERIAL PRIMARY KEY, idea VARCHAR, topic VARCHAR, saved BOOLEAN, date TIMESTAMP);`, (err, res) => {
    if (err) {
        console.log("Error - failed to create table");
        console.log(err);
    }
    else{
        console.log(res.rows);
    }
});
*/

// Get all data from table
/*
pool.query(`SELECT * FROM Address;`, (err, res) => {
    if (err) {
        console.log("Error - Failed to select all from Address");
        console.log(err);
    }
    else{
        console.log(res.rows);
    }
});
*/

// Add data to table
/*
pool.query(`INSERT INTO Users(FirstName,LastName) Values('Jesse','Turner');`, (err, res) => {
    if (err) {
        console.log("Error - Failed to insert data");
        console.log(err);
    }
    else{
        console.log(res.rows);
    }
});
*/

// DOESNT WORK YET TO UPLOAD IMAGE TO DATABASE

pool.query(`UPDATE world_leaders
SET Image = /image/Joe_Biden_presidential_portrait.jpeg
WHERE id = 1;`, (err, res) => {
    if (err) {
        console.log("Error - failed to create table");
        console.log(err);
    }
    else{
        console.log(res.rows);
    }
});
