const express = require('express');
const routes = require('../routes');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();
server.use(express.json());

var corsOptions = {
    origin: "http://localhost:9527"
  };
server.use(cors(corsOptions));

// parse requests of content-type - application/json
server.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

const db = require("../database/models");

db.sequelize.sync(/*{force:true}*/).then(async() => {
    console.log('Resync DB');
})
.catch((err) => {
    console.log(err);
});

server.use('/api/v1', routes);

module.exports = server;