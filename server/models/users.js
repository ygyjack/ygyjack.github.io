const db = require('../database');

class Users {

  static retrieveAll() {
    let query = {
      text: 'SELECT username FROM users'
    }
    return new Promise((resolve, reject) => {
      db.query(query)
      .then(res => {
        console.log('===== Models=>Users=>retrieveAll resolved: ', res);
        resolve(res);
      }, rej => {
        console.log('===== Models=>Users=>retrieveAll rejected: ', rej);
        reject(rej);
      })
      .catch(err => {
        reject(err);
        console.error('===== Models=>Users=>insert Error: Executing Query', err);
      });
    });
  }

  static insert(user) {
    let query = {
      text: 'INSERT INTO users (username) VALUES ($1)',
      values: [user]
    }
    return new Promise((resolve, reject) => {
      db.query(query)
      .then(res => {
        console.log('===== Models=>Users=>insert resolved: ', res);
        resolve(res);
      }, rej => {
        console.log('===== Models=>Users=>insert rejected: ', rej);
        reject(rej);
      })
      .catch(err => {
        reject(err);
        console.error('===== Models=>Users=>insert Error: Executing Query', err);
      });
    });
  }
}

module.exports = Users;
