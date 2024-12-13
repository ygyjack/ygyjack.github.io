const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '../clinet')));
app.use('/api/users', require('./api/users'));
app.use('/api/logs', require('./api/logs'));

app.listen(PORT, () => {
  console.log(`Server listening the Port ${PORT}! On ${(new Date()).toUTCString()}`);
});

db.query('SELECT NOW()', (err, res) => {
  if (err.error) return console.log(err.error);
  console.log('PostgreSQL connected:', res[0].now);
});

module.exports = app;
