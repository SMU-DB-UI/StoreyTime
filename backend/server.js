
//create main objects
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const mysql = require('mysql');
var path = require('path');
var crypto = require('crypto'); //hash

//create the mysql connection object.  
// var connection = mysql.createConnection({
//   host: 'backend-db',
//   port: '3306',
//   user: 'user',
//   password: 'password',
//   database: 'ballotBuddy'
// });

//set up some configs for express. 
const config = {
  name: 'backend',
  port: 8000,
  host: '0.0.0.0',
};

const app = express();
//create the express.js object

//create objects for sessions

// const flash = require('connect-flash');
// const session = require('express-session');
// app.use(session({
//   secret: 'Text goes here',
//   resave: true,
//   saveUninitialized: true
// }));

//create a logger object.  Using logger is preferable to simply writing to the console. 
const logger = log({ console: true, file: false, label: config.name });

app.use(express.urlencoded({ extended: true })); // express body-parser
app.use(bodyParser.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//Attempting to connect to the database.

// connection.connect( function(err) {
//   if(err)
//   {
//       throw err;
//   }
//   else
//   {
//     logger.info("connected to DB");
//   }

// });


//connecting the express object to listen on a particular port as defined in the config object. 

app.listen(config.port, config.host, (e) => {
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
}); 

// app.get('/', function(err, result)
// {
//   result.status(200).send("on 0.0.0.0:3000");
// });

var routes = require('./Router/routes.js');
routes(app);
