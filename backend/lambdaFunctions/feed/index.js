const {Client} = require('pg');
const jwt = require('jsonwebtoken');
const config = require('./config.json');

// Main function
exports.handler = async (event, context, callback) => {
    
    // Video class
    class Video{
        
     constructor(id, lifetime, liked, profile, username, url, caption, likes, location) {
        this.id = id;
        this.lifetime = lifetime;
        this.liked = liked;
        this.profile = profile;
        this.name = username;
        this.content = url;
        this.caption = caption;
        this.likes = likes;
        this.location = location;
        }
    }
    
    let videos = [];

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
    let decoded = jwt.decode(event.queryStringParameters.token, {complete: true});
    let userId = parseInt(decoded.payload.data);
    let query = null;
    let values = [];
    
    // If just getting most recent of all videos...
    if (event.queryStringParameters.from != 'popular' && event.queryStringParameters.from != 'following') {
        query = 'SELECT v.id, EXTRACT(Day FROM v.expiredate - NOW()) as lifetime, description, likes, url, location, l.users, u.username, u.profilepicture FROM videos v INNER JOIN likes l on (v.id = l.videoid) INNER JOIN users u on (v.ownerid = u.id) ORDER BY v.uploaddate DESC LIMIT 10;';
    } else if(event.queryStringParameters.from == 'popular'){
        query = 'SELECT v.id, EXTRACT(Day FROM v.expiredate - NOW()) as lifetime, description, likes, url, location, l.users, u.username, u.profilepicture FROM videos v INNER JOIN likes l on (v.id = l.videoid) INNER JOIN users u on (v.ownerid = u.id) ORDER BY v.likes DESC LIMIT 10;'
    } else if(event.queryStringParameters.from == 'following'){
        query = 'SELECT v.id, EXTRACT(Day FROM v.expiredate - NOW()) as lifetime, description, likes, url, location, l.users, u.username, u.profilepicture FROM videos v LEFT OUTER JOIN likes l on (v.id = l.videoid) LEFT OUTER JOIN users u on (v.ownerid = u.id) LEFT OUTER JOIN followers ON followers."followingId" = v.ownerid WHERE followers."followerId" = $1 ORDER BY v.likes DESC LIMIT 10;'
        values = [userId]
    }

    // Make DB query to insert video entry into DB, assuming video upload goes successfully
    await client.query(query, values) //Initiate query
        .then(res => {
            
            // For up to 10 videos...
            for (let i = 0; i < res.rowCount; i++) {
                // See if the user requesting the videos has liked each video
                let liked = false;
                if (res.rows[i].users.indexOf(userId) > -1) {
                    liked = true;
                }
                
                // Create + Push each video onto videos array
                videos.push(new Video(res.rows[i].id, res.rows[i].lifetime, liked, res.rows[i].profilepicture, res.rows[i].username, res.rows[i].url, res.rows[i].description, res.rows[i].likes, res.rows[i].location));
            }
            client.end();
        })
        .catch(err => { //Catch and display any error if query fails
            console.log(err);
            let response = {
                statusCode: 400,
                body: "Failure to connect to DB",
            };
            return response;
        });
        
    console.log(videos);

    let response = {
        statusCode: 200,
        body: JSON.stringify(videos)
    };

    return response;
};