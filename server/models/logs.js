const request = require('request-promise');

require('dotenv').config();

const API_CONNECTION = process.env.MY_API_CONNECTION || 'http://localhost:5001/';

class logs {
  static getLogs() {
    return new Promise((resolve, reject) => {
      request({
        url: `${API_CONNECTION}api/logs`,
        json: true
      }).then(res => {
        resolve(res);
      }).catch(err => {
        console.error(err);
        reject({error: 'API Error: '+err});
      });
    });
  }
}

module.exports = logs;
