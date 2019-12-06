const {Client} = require('pg')

exports.handler = async (event, context) => {
  console.log("Trying to connect to database");
  
  const client = new Client({
    user: 'postgres',
    host: 'leaf.cepqqkcdpmvs.us-east-1.rds.amazonaws.com',
    database: 'leaf',
    password: 'WeDemBoiz!',
    port: 5432,
  });
  client.connect();
  
  console.log("Succesfully connected to database");
  console.log("Running Query");
  
  let query = 'select count(username) from users where LOWER(username)=LOWER($1)';  //Query structures
  let values = [event.username]; //Values to put into query
  console.log(event.username);
  
  let count = 1;
  
  await client.query(query, values) //Initiate query
    .then(res => {
      count = res.rows[0].count; //Get password
      console.log(res.rows[0].count);
      client.end();
    })
    .catch(err => { //Catch and display any error if query fails
      console.log(err);
    });

  console.log(count);
  
  let response = null;
  
  if (count == 0) {
    response = {
      statusCode: 200,
      body: true,
    };
  }
  
  // Otherwise, return nothing.
  else {
      response = {
        statusCode: 400,
        body: false,
    };
  }
  
  console.log("End Query and Connection");
  console.log(response);
  
  return response;
  };