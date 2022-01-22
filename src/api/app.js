const express = require('express');
const path = require('path');

const { createUserController } = require('./controllers/users.controller');

const { errorMiddleware } = require('./middlewares/error.middleware');

const app = express();

// necessário para o projeto, de acordo com o readme
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador!
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUserController);

app.use(errorMiddleware);

module.exports = app;
