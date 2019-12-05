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

  let decodedToken = jwt.verify(event.queryStringParameters.token, config.secret)
  console.log("Running Query for Username stored in token");
  //Get username for id in token
  let query = 'SELECT username FROM users WHERE id=$1'
  let values = [decodedToken.data];
  let tokenUsername = ""
  await client.query(query, values) //Initiate query
    .then(res => {
      tokenUsername = res.rows[0].username;
    })
    .catch(err => { //Catch and display any error if query fails
      console.log(err);
      let response = {
        statusCode: 400,
        body: "Query failure",
      };
      return response;
    });


    

    //Gets all needed data from Likes, Videos, and Users tables
    if(event.queryStringParameters.username == ""){
      event.queryStringParameters.username = tokenUsername
    }
  query = 'SELECT users.profilepicture, users.id uid, users.username, users.name, users.points, users.multiplier, videos.id, EXTRACT(Day FROM videos.expiredate - NOW()) as life, likes.users, videos.title, videos.description, videos.likes, videos.url FROM users FULL JOIN videos ON users.id = videos.ownerid FULL JOIN likes ON videos.id = likes.videoid WHERE users.username=$1';  //Query structures
  values = [event.queryStringParameters.username]//Values to put into query
  let [username, profilepicture, name, points, multiplier, uid] = [null, null, null, null, null, null]
  let videos = []
  await client.query(query, values) //Initiate query
    .then(res => {
      username = res.rows[0].username; 
      profilepicture = res.rows[0].profilepicture; 
      name = res.rows[0].name
      points = res.rows[0].points
      multiplier = res.rows[0].multiplier
      uid = res.rows[0].uid
      for (let i = 0; i < res.rows.length; i++) {
        let row = res.rows[i]
        let liked = null;
        //Checks if user liked video or not
        if (username == tokenUsername) {
          liked = null
        } else if (row.users.includes(decodedToken.data)) {
          liked = true
        } else {
          liked = false
        }
        videos.push({
          "id": row.id,
          "description": row.description,
          "uri": row.url,
          "life": row.life,
          "liked": liked
        })
      }
      console.log(videos)
    })
    .catch(err => { //Catch and display any error if query fails
      console.log(err);
      let response = {
        statusCode: 400,
        body: "Query failure",
      };
      return response;
    });


  //If usernames don't match check if following
  let following = null;
  if (username != tokenUsername) {
    query = 'SELECT COUNT(*) FROM followers WHERE "followingId" = $1 AND "followerId" = $2'
    values = [uid, decodedToken.data]
    await client.query(query, values) //Initiate query
      .then(res => {
        if (res.rows[0].count == 0) {
          following = false
        } else {
          following = true
        }
      })
      .catch(err => { //Catch and display any error if query fails
        console.log(err);
        let response = {
          statusCode: 400,
          body: "Query failure",
        };
        return response;
      });

  }
  let results = {
      username,
      profilepicture,
      name,
      points,
      multiplier,
      following,
      videos
    }
  let response = {
    statusCode: 200,
    body: JSON.stringify(results)
  };

  console.log("End Query and Connection");
  client.end()
  console.log(response)
  return response;
};

