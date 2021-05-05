const expess = require('express');
const Cors = require('cors');
const process = require('process');
const Sequelize = require('sequelize').Sequelize;
// const Connection = require('./models/Connection.js');
const user = require('./routes/users.routes.js');
const project = require('./routes/project.routes.js');
const path = require('path')
const fileURLToPath = require('url');
// const __filename = fileURLToPath(import.meta.url);
// const  __dirname = path.dirname(__filename);
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

// Connection
//   .authenticate()
//   .catch(err => console.error(err));

// Connection
//   .sync()
//   .catch(err => console.error(err));

if (process.env.NODE_ENV === 'production') {
  app.use(expess.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
//Listener
app.listen(port, () => console.log('Server Starts on localhost', port));