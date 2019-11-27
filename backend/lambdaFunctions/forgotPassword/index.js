const { Client } = require('pg')
const mailer = require("nodemailer");
const axios = require('axios');
const Bcrypt = require('bcryptjs');

const config = require('./config.json');

const mainFunction = async (event, context) => {
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
  let query = ""
  let values = []
  let email = "";
  if (event.email != null) {
    email = event.email
    query = 'select count(email) from users where LOWER(email)=LOWER($1)';  //Query structures
    values = [event.email]; //Values to put into query
  }
  else {
    let phone = event.phone.replace(/\D/g, '');
    query = 'select count("phoneNumber") from users where "phoneNumber"=$1';  //Query structures
    values = [phone]; //Values to put into query
  }

  let count = 0;
  await client.query(query, values) //Initiate query
    .then(res => {
      count = res.rows[0].count;
      console.log(res.rows[0]);
    })
    .catch(err => { //Catch and display any error if query fails
      console.log(err);
    });

  console.log(count);

  let response = null;

  if (count == 1) {
    if (!email) {
      // email = event.phone+"@vtext.com"
      let phone = "1" + event.phone.replace(/\D/g, '');
      console.log(phone)
      axios.get(`http://apilayer.net/api/validate?access_key=${config.numverifyAPIKey}&number=${phone}`).then(response => {
        console.log(response)
        let carrier = response.data.carrier;
        console.log(carrier)
        carrier = carrier.toString()
        if (carrier.includes("Verizon")) {
          email = event.phone.replace(/\D/g, '') + "@vtext.com"
        } else if (carrier.includes("AT&T")) {
          email = event.phone.replace(/\D/g, '') + "@txt.att.net"
        } else if (carrier.includes("Sprint")) {
          email = event.phone.replace(/\D/g, '') + "@messaging.sprintpcs.com"
        }
      })
        .catch(err => {
          console.log(err);
        });
    }
    //Initialize email account using OAuth details
    const emailTransport = mailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: 'Wedemboiz234612@gmail.com',
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken,
      }
    });

    //Generate new password and store it into database
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = Bcrypt.hashSync(tempPassword, 10);
    query = "";
    values = []
    if (event.email) {
      query = 'UPDATE users SET password=$1 WHERE email=$2';
      values = [hashedPassword, email]
    } else {
      query = 'UPDATE users SET password=$1 WHERE "phoneNumber"=$2';
      values = [hashedPassword, event.phone.replace(/\D/g, '')]
    }
    await client.query(query, values) //Initiate query
      .then(res => { client.end() })
      .catch(err => { //Catch and display any error if query fails
        console.log(err);
      });

    //Set mail content
    const mail = {
      from: "Leaf <Wedemboiz234612@gmail.com>",
      to: email,
      subject: "Password Rest - Leaf",
      text: "Below is a new temporary password: \n " + tempPassword,
    }

    //Send the email
    await new Promise(() => {
      emailTransport.sendMail(mail, (error, response) => {
        if (error) {
          console.log("Message failed to send")
          console.log(error);
        } else {
          console.log("Message sent!");
          return {
            statusCode: 200,
            body: true,
          };
        }
        emailTransport.close();
      });
    })
  }

  // Otherwise, return nothing.
  else {
    console.log("No match")
    client.end()
    return {
      statusCode: 400,
      body: false,
    };
  }
}

exports.handler = async (event, context) => {
  return mainFunction(event, context).then((res) => {
    return res
  }).then(res => {
    return res
  })
};


