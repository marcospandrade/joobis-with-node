require('dotenv').config();

module.exports = {
  development: {
    "username": "leadfinder",
    "password": "clxj#*fc3!3er8cxm#B#!W",
    "database": "analytics_dev",
    "host": "leadfinder-desenvolvimento.clejdtkgpgwp.sa-east-1.rds.amazonaws.com",
    "dialect": "postgres",
    "port" : "54321"
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    "username": "leadfinder",
    "password": "clxj#*fc3!3er8cxm#B#!W",
    "database": "analytics_dev",
    "host": "leadfinder-desenvolvimento.clejdtkgpgwp.sa-east-1.rds.amazonaws.com",
    "dialect": "postgres",
    "port" : "54321"
  },
};