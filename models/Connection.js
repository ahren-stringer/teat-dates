import { Sequelize } from 'sequelize';
let Connection={}
if (process.env.DATA_URL){
  Connection=new Sequelize(process.env.DATA_URL,
    {
      dialect: "postgres",
      protocol: "postgres",
      port: 5432,
      host: "test-dates",
      logging: true //false
   });
}else{
  Connection = new Sequelize('test_dates', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
  });
}


export default Connection;