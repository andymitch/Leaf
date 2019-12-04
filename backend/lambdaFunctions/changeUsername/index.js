const {Client} = require('pg')
let Bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config.json');

exports.handler = async (event, context) => {
  //Initialize Database connection
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
  
  //Extract details and verify token
  const decodedToken = jwt.verify(event.token, config.secret);

  //First query to get password
  let query = 'SELECT password FROM users WHERE id=$1';  //Query structures
  let values = [decodedToken.data]; //Values to put into query
  
  let savedPassword = null;  // will hold hashed password from DB
  
  await client.query(query, values) //Initiate query
    .then(res => {
      savedPassword = res.rows[0].password; //Get password
      console.log(res.rows[0].password);
    })
    .catch(err => { //Catch and display any error if query fails
      console.log(err);
    });
  
  console.log(savedPassword);
  
  let response = null;
  
  //If password is correct update
  if (Bcrypt.compareSync(event.current, savedPassword)) {
    let query = 'update users set username=$1 WHERE id=$2';  //Query structures
    let values = [event.username, decodedToken.data]; //Values to put into query
    await client.query(query, values) //Initiate query
    .then(res => {
      response = {
        statusCode: 200,
        body: true,
    };
    })
    .catch(err => { //Catch and display any error if query fails
      console.log(err);
      response = {
        statusCode: 400,
        body: false,
    };
    });
      
  }
  // Otherwise, return nothing.
  else {
      response = {
        statusCode: 400,
        body: false,
    };
  }
  client.end();
  console.log("End Query and Connection");
  
  console.log(response);
  
  return response;
  };