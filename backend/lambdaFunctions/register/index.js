const {Client} = require('pg');
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
  
  // Automatically Hash + Salt cleartext password
  let hashedPassword = Bcrypt.hashSync(event.password, 10);
  console.log(hashedPassword);
  
  let query = null;
  let values = null;
  // If user signs up with email, set query string appropriately
  if (event.email != null) {
    console.log("email");
    query = 'INSERT INTO users(username, password, email) VALUES($1, $2, $3)' //Default query with variable values
    values = [event.username, hashedPassword, event.email] //Insert these values into above variables
  }
  
  // If user signs up with phone, set query string appropriately
  else {
    console.log("phone");
    query = 'INSERT INTO users(username, password, phoneNumber) VALUES($1, $2, $3)';
    values = [event.username, hashedPassword, event.phone];
  }

  await client.query(query, values) //Await for the query so it doesn't finish early
  .then(res => {
    console.log("test")
    console.log(res)
    client.end();
    const response = { //Return 201 code which means new resource was succesfully created
        statusCode: 201,
        body: JSON.stringify("Success!"),
    };
  console.log(response);
  return response;
  })
  .catch(e => {
    console.log(e);
    client.end();
    const response = { //Failed to create so return 500 as error code
        statusCode: 500,
        body: JSON.stringify("Failed to create user!"),
    };
  console.log(response);
  return response;
  });
  
  };
