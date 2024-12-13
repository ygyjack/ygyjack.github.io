const { Pool } = require('pg');

require('dotenv').config();

const DB_CONNECTION = `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:5432/${process.env.DB_DEFAULT}` || 'postgresql://localhost:password@localhost:5432/users';
const SSL = process.env.NODE_ENV === 'production';

class Database {
  constructor() {
    this._pool = new Pool({
      connectionString: DB_CONNECTION,
      ssl: SSL
    });
    this._pool.on('error', (err, clinet) => {
      console.error('Unexpected error on idle PostgreSQL client', err);
    });
  }

  query(query) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(query)
        .then(res => {
          done();
          return resolve(res.rows);
        }, rej => {
          console.log("===== Database Rejected ===== ", rej);
          return reject({error: 'Database Rejected.'});
        })
        .catch(err => {
          console.error("===== Database Error ===== ", err.stack);
          return reject({error: 'Database Error.'});
        });
      });
    });
  }

  end() {
    this._pool.end();
  }
}

module.exports = new Database();
