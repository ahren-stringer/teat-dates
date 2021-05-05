const { Pool } = require('pg'); // import node-postgres
let pool;
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({ // create connection to database
    connectionString: process.env.DATABASE_URL,	// use DATABASE_URL environment variable from Heroku app 
    ssl: {
      rejectUnauthorized: false // don't check for SSL cert
    }
  });
} else {
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test_dates',
    password: 'postgres',
    port: 5432,
  })
}
module.exports = pool;