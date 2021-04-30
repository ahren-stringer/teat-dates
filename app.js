import expess from 'express';
import Cors from 'cors';
import * as process from 'process';
import { Sequelize } from 'sequelize';
import Connection from './models/Connection.js';
import user from './routes/users.routes.js';
//API Config
const app = expess();
const port = process.env.PORT || 8001;

//Middlewares
app.use(expess.json());
app.use(Cors());

// Пользователи
app.use('', user)

Connection
  .authenticate()
  .catch(err => console.error(err,'hhhhhhhhhhhhhhhhhhhh'));

Connection
  .sync()
  .catch(err => console.error(err,'jjjjjjjj'));

//Listener
app.listen(port, () => console.log('Server Starts on localhost', port));