import {Sequelize} from 'sequelize';
import Connection from './Connection.js';

const Project = Connection.define('projects', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  freezeTableName: true,
  underscored: true
});

export default Project;