import expess from 'express';
import Cors from 'cors';
import * as process from 'process';
import { Sequelize } from 'sequelize';
import Connection from './models/Connection.js';
import user from './routes/users.routes.js';
import project from './routes/project.routes.js';
//API Config
const app = expess();
const port = process.env.PORT || 8001;

//Middlewares
app.use(expess.json());
app.use(Cors());

// Пользователи
app.use('', user)
// Проекты
app.use('', project)

Connection
  .authenticate()
  .catch(err => console.error(err));

Connection
  .sync()
  .catch(err => console.error(err));

if (process.env.NODE_ENV === 'production') {
  app.use(expess.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//Listener
app.listen(port, () => console.log('Server Starts on localhost', port));