const {Client} = require('pg');
const jwt = require('jsonwebtoken');
const config = require('./config.json');

// Main function
exports.handler = async (event, context, callback) => {

    console.log(event);
    console.log("Trying to connect to database");

    // Connect to database before trying anything with S3
    const client = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
        port: config.port,
    });

    client.connect();

    // Get user ID from JWT token
    let userid = null;
    let badResponse = {
                statusCode: 400,
                body: "Error authenticating",
    };
    try {
        let decoded = jwt.decode(event.token, {complete: true});
        userid = decoded.payload.data;
    }
    catch(e) {
        console.log("Error with authToken" + e);
        return badResponse;
    }
    
    let query = null;
    let values = null;
    let query2 = null;
    let values2 = [event.id, event.id, event.id];
    
    if (event.like) {
        query = 'UPDATE likes SET users = array_append(users, $1) WHERE videoid=$2';
        values = [userid, event.id]; //Values to put into query
        query2 = "UPDATE videos SET likes = array_length((SELECT users FROM likes where videoid=$1), 1), expiredate = (SELECT expiredate FROM videos WHERE id=$2) + interval '1 day' WHERE id=$3";
    }
    else if (!event.like) {
        query = 'UPDATE likes SET users = array_remove(users, $1) WHERE videoid=$2';
        values = [userid, event.id]; //Values to put into query
        query2 = "UPDATE videos SET likes = array_length((SELECT users FROM likes where videoid=$1), 1), expiredate = (SELECT expiredate FROM videos WHERE id=$2) - interval '1 day' WHERE id=$3";
    }
    else {
        console.log('Unknown Like Value');
        console.log(event);
        badResponse.body = 'Unknown Like Value';
        return badResponse;
    }

    // Make DB query to insert video entry into DB, assuming video upload goes successfully
    await client.query(query, values) //Initiate query
        .then(res => {
            console.log('Updated likes table');
        })
        .catch(err => { //Catch and display any error if query fails
            client.end();
            console.log(err);
            badResponse.body = 'Unable to connect to DB';
            return badResponse;
        });
        
    // Make DB query to insert video entry into DB, assuming video upload goes successfully
    await client.query(query2, values2) //Initiate query
        .then(res => {
            console.log('Successfully updated like count in video table');
            client.end();
        })
        .catch(err => { //Catch and display any error if query fails
            client.end();
            console.log(err);
            badResponse.body = 'Unable to connect to DB 2';
            return badResponse;
        });

    let response = {
        statusCode: 200,
        body: "Success"
    };
    
    console.log('Success');

    return response;
}