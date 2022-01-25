const express = require('express');
const path = require('path');
const multer = require('multer');

const { createUserController,
  getLoginController } = require('./controllers/users.controller');

const { createRecipesController,
  getRecipesController,
  getRecipesByIdController,
  updateRecipeByIdController,
  deleteRecipeByIdController,
  putRecipeImageController } = require('./controllers/recipes.controller');

const { errorMiddleware } = require('./middlewares/error.middleware');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './src/uploads'),
  filename: (req, file, cb) => {
    const { id } = req.params;

    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage }).single('image');

app.use(express.json());

// necessário para o projeto, de acordo com o readme
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador!
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUserController);

app.post('/login', getLoginController);

app.post('/recipes', createRecipesController);

app.get('/recipes', getRecipesController);

app.get('/recipes/:id', getRecipesByIdController);

app.put('/recipes/:id', updateRecipeByIdController);

app.delete('/recipes/:id', deleteRecipeByIdController);

app.put('/recipes/:id/image/', upload, putRecipeImageController);

app.use(errorMiddleware);

module.exports = app;
