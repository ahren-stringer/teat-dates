import { Sequelize } from 'sequelize';

const Connection = new Sequelize('test-dates', 'postgres', 'newpasword_4', {
  host: 'localhost',
  dialect: 'postgres'
});

export default Connection;