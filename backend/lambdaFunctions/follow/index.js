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
  let decodedToken = jwt.verify(event.token, config.secret)
  let query = 'INSERT INTO followers ("followingId", "followerId") SELECT id, $1 FROM users WHERE username=$2' 
  let values = [decodedToken.data, event.username];
  let results = []
  await client.query(query, values) //Initiate query
    .then(res => {
      client.end()
      let response = {
        statusCode: 200,
        body: "Success!"
      }
      return response
    })
    .catch(err => { //Catch and display any error if query fails
      console.log(err);
      let response = {
        statusCode: 400,
        body: "Query failure",
      };
      return response;
    });
};
