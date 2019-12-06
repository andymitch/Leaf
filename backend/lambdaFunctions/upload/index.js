var aws = require('aws-sdk');
const {Client} = require('pg');
const jwt = require('jsonwebtoken');
const config = require('./config.json');

// Main function
exports.handler = async (event, context, callback) => {
    // Add pre-made IAM user credentials with full access to S3 bucket
    aws.config.update({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    });
    
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
    console.log("connected to DB");


    // S3 Object
    const s3 = new aws.S3();

    let count = 1;
    const myBucket = 'leaf-video';
    const signedUrlExpireSeconds = 60 * 5;
    let myKey = '';
    let url = '';
    let randomName = '';

    // Keep in this loop until we have a unique name
    while (count != 0) {
        // Generate random name for us to use in database
        randomName = Math.random().toString(36).replace(/[^a-z]+/g, '');
        
        let filetype = null;

        // S3 Connection information
        if (event.system === "ios") {
            myKey = randomName + '.mov';
            filetype = `video/mov`;
        }
        else {
            myKey = randomName + '.mp4';
            `video/mp4`;
        }

        // Get pre-signed URL for S3 Bucket
        url = s3.getSignedUrl('putObject', {
            Bucket: myBucket,
            Key: 'video/' + myKey,
            Expires: signedUrlExpireSeconds,
            ContentType: filetype
        });

        // Query to make sure random name doesn't already exist in database
        let query = 'select count(id) from videos where LOWER(title)=LOWER($1)';  //Query structures
        let values = [randomName]; //Values to put into query

        // Make DB query and ensure name doesn't already exist in DB
        await client.query(query, values) //Initiate query
            .then(res => {
                count = res.rows[0].count; //Get count
                console.log(count);
            })
            .catch(err => { //Catch and display any error if query fails
                console.log(err);
                let response = {
                    statusCode: 400,
                    body: "Failure to connect to DB"
                };
                client.end();
                return response;
            });
    }

    // Get user ID from JWT token
    const decodedToken = jwt.verify(event.token, config.secret);
    console.log(decodedToken.data);

    // The url where the video will actually be available to view
    let uploadUrl = "https://diwoaedb40lx7.cloudfront.net/video/" + myKey;

    // Insert the randomTitle we generate, the caption, the user id, and the uploadURL
    let query2 = 'INSERT INTO videos (title, description, ownerid, url, location, likes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';  //Query structures
    let values2 = [randomName, event.caption, decodedToken.data, uploadUrl, event.location, 1]; //Values to put into query
    let id = null;
    
    console.log("INSERT INTO videos (title, description, ownerid, url, location) VALUES (" + randomName + ", " + event.caption + ", " + decodedToken.data + ", " + uploadUrl + ", " + event.location + ")");

    // Make DB query to insert video entry into DB, assuming video upload goes successfully
    await client.query(query2, values2) //Initiate query
        .then(res => {
            id = res.rows[0].id; //Get count
        })
        .catch(err => { //Catch and display any error if query fails
            console.log(err);
            let response = {
                statusCode: 400,
                body: "Failure to connect to DB",
            };
            client.end();
            return response;
        });
        
    let query3 = 'INSERT INTO likes (videoid, users) VALUES ($1, $2) RETURNING id';
    let values3 = [id, [decodedToken.data]];
    id = null;
    
    // Make sure entry in Like table is created
    await client.query(query3, values3) //Initiate query
        .then(res => {
            id = res.rows[0].id; //Get count
            client.end();
        })
        .catch(err => { //Catch and display any error if query fails
            console.log(err);
            let response = {
                statusCode: 400,
                body: "Failure to connect to DB - 3",
            };
            client.end();
            return response;
        });

    let response = {
        statusCode: 200,
        body: "Success",
        uploadUrl: url,
        name: randomName
    };
    
    console.log(response);

    return response;
};
