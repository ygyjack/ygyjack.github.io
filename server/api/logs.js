const express = require('express');
const Logs = require('../models/logs');

const router = express.Router();

router.get('/', (req, res) => {
  Logs.getLogs()
  .then(result => {
    console.log("===== API=>Logs=>getLogs Resolved: ", result);
    res.json(result);
  }, reject => {
    console.log("===== API=>Logs=>getLogs Rejected: ", reject);
    res.json(reject);
  })
  .catch(err => {
    console.error("===== API=>Logs=>getLogs Error: ", err);
    res.json(err);
  });
});

module.exports = router;
