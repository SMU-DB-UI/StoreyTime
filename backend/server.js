
//create main objects
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const mysql = require('mysql');
var path = require('path');
var crypto = require('crypto'); //hash

//set up some configs for express. 
const config = {
  name: 'backend',
  port: 8000,
  host: '0.0.0.0',
};

//create the express.js object
const app = express();

//create a logger object.  Using logger is preferable to simply writing to the console. 
const logger = log({ console: true, file: false, label: config.name });

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//connecting the express object to listen on a particular port as defined in the config object. 

app.listen(config.port, config.host, (e) => {
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
}); 

app.get('/', function(err, result)
{
  result.status(200).send("on 0.0.0.0:3000");
});

var routes = require('./Router/routes.js');
routes(app);
