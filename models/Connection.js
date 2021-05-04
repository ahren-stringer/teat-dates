import { Sequelize } from 'sequelize';

// const Connection = new Sequelize('test-dates', 'postgres', 'postgres', {
//   host: 'localhost',
//   dialect: 'postgres'
// });
let Connection=null;
if (!global.hasOwnProperty("models")) {

if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres         database
    Connection =new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL,
 {
   dialect: "postgres",
   protocol: "postgres",
   port: 5432,
   host: "test-dates",
   logging: true //false
});
} else {
// the application is executed on the local machine ... use mysql
Connection =new Sequelize("postgres://postgres:postgres@localhost:  5432/test-dates",
  {
  dialect: "postgres"
  }
 );
}
global.models = {
  Sequelize: Sequelize,
  sequelize: Connection,
  User: sequelize.import(__dirname + "/user"),
// add your other models here
  };
}
// module.exports = global.models;
export default Connection