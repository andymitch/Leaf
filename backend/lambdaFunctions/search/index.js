const { Client } = require('pg')
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

  console.log("Starting to Run Query");
  let query = 'SELECT username, profilepicture, name FROM users WHERE LOWER(username) ~ LOWER($1) OR LOWER(name) ~ LOWER($1) LIMIT 50' // "~" is basically like contains
  let values = [event.queryStringParameters.keyphrase];
  let results = []
  await client.query(query, values) //Initiate query
    .then(res => {
      results = res.rows;
    })
    .catch(err => { //Catch and display any error if query fails
      console.log(err);
      let response = {
        statusCode: 400,
        body: "Query failure",
      };
      return response;
    });
  let response = {
    statusCode: 200,
    body: JSON.stringify({"data": results}),
    
  };
  console.log("End Query and Connection");
  client.end()
  console.log(JSON.stringify(response))
  return response;
};
