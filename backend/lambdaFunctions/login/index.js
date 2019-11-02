const {Client} = require('pg')
let Bcrypt = require('bcryptjs');
const config = require('./config.json');

exports.handler = async (event, context) => {
  console.log("Trying to connect to database");
  
  const client = new Client({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port,
  });
  client.connect();
  
  console.log("Succesfully connected to database");
  console.log("Running Query");
  
  

  let query = 'SELECT id, password FROM users WHERE username=$1';  //Query structures
  let values = [event.username]; //Values to put into query
  
  let savedPassword = null;  // will hold hashed password from DB
  let primaryKey = 0;  // Will hold primary key for that user
  
  await client.query(query, values) //Initiate query
    .then(res => {
      savedPassword = res.rows[0].password; //Get password
      primaryKey = res.rows[0].id; //Get primary key
      console.log(res.rows[0].password);
      client.end();
    })
    .catch(err => { //Catch and display any error if query fails
      console.log(err);
    });
  
  console.log(savedPassword);
  console.log(primaryKey);
  
  let response = null;
  
  // Compare the cleartext password to the hashed password
  // If they are a match, return primary key
  if (Bcrypt.compareSync(event.password, savedPassword)) {
      response = {
        statusCode: 200,
        body: JSON.stringify(primaryKey),
    };
  }
  // Otherwise, return nothing.
  else {
      response = {
        statusCode: 400,
        body: "Invalid Password.",
    };
  }
  
  console.log("End Query and Connection");
  console.log(response);
  
  return response;
  };