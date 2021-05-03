import {Sequelize} from 'sequelize';
import Connection from './Connection.js';

const User = Connection.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  project: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date_registration:{
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  date_last_activity:{
    type: Sequelize.DATEONLY,
    allowNull: false
  }
}, {
  freezeTableName: true,
  underscored: true
});

export default User;