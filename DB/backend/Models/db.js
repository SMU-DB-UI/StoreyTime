'use strict';

var connect = require('mysql');

var connection = connect.createConnection(
    {
        host: 'backend-db',
        port: '3306',
        user: 'user',
        password: 'password',
        database: 'db'
    });

connection.connect( function(err) {
    if(err)
    {
        throw err;
    }

});


module.exports = connection;