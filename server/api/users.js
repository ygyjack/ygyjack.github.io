const express = require('express');
const Users = require('../models/users');

const router = express.Router();

router.get('/', (req, res) => {
  Users.retrieveAll()
  .then(result => {
    console.log("===== DB=>Users=>retrieveAll Resolved: ", result);
    res.json(result);
  }, reject => {
    console.log("===== DB=>Users=>retrieveAll Rejected: ", reject);
    res.json(reject);
  })
  .catch(err => {
    console.error("===== DB=>Users=>retrieveAll Error: ", err);
    res.json(err);
  });
});

router.post('/', (req, res) => {
  const username = req.body.username;
  console.log("===== BE=>Added Username", username);
  Users.insert(username)
  .then(result => {
    log("===== DB=>Users=>insert Resolved: ", result);
    res.json(result);
  }, reject => {
    log("===== DB=>Users=>insert Rejected: ", reject);
    res.json(reject);
  })
  .catch(err => {
    console.error("===== DB=>Users=>insert Error: ", err);
    res.json(err);
  });
});

module.exports = router;
