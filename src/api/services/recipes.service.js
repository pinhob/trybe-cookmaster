const { ObjectId } = require('mongodb');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { createRecipes,
  getRecipes,
  getRecipesById,
  updateRecipeById,
  deleteRecipeById,
  putRecipeImage } = require('../models/recipes.model');
const errorHandling = require('../utils/errorHandling');

const notSoSecret = 'seusecretdetoken';

const recipesSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const createRecipesService = async (token, name, ingredients, preparation) => {
  const { error } = recipesSchema.validate({ name, ingredients, preparation });

  if (error) throw errorHandling(400, 'Invalid entries. Try again.');

  // solução de erro inspirada em: https://imasters.com.br/desenvolvimento/json-web-token-conhecendo-o-jwt-na-teoria-e-na-pratica
  const decoded = jwt.verify(token, notSoSecret, (err, decodedInfos) => {
    if (err) throw errorHandling(401, 'jwt malformed');

    return decodedInfos;
  });

  const { _id: userId } = decoded;

  const recipe = await createRecipes(name, ingredients, preparation, userId);

  return { recipe };
};

const getRecipesService = async () => {
  const recipes = await getRecipes();

  return recipes;
};

const getRecipesByIdService = async (id) => {
  const idIsValid = ObjectId.isValid(id);

  // com base em: https://stackoverflow.com/a/25497438
  if (!idIsValid) throw errorHandling(404, 'recipe not found');

  const recipe = await getRecipesById(id);

  return recipe;
};

const updateRecipeByIdService = async (token, body, id) => {
  const { name, ingredients, preparation } = body;

  if (!token) throw errorHandling(401, 'missing auth token');
  
  const decoded = jwt.verify(token, notSoSecret, (err, infos) => {
    if (err) throw errorHandling(401, 'jwt malformed');

    return infos;
  });
  
  const editedRecipe = await updateRecipeById(name, ingredients, preparation, id);

  const { _id: userId } = decoded;

  return { userId, ...editedRecipe };
};

const deleteRecipeByIdService = async (token, id) => {
  if (!token) throw errorHandling(401, 'missing auth token');
  
  jwt.verify(token, notSoSecret, (err, _infos) => {
    if (err) throw errorHandling(401, 'jwt malformed');
  });

  const deletedRecipe = await deleteRecipeById(id);

  return deletedRecipe;
};

const putRecipeImageService = async (id, imageName, token) => {
  if (!token) throw errorHandling(401, 'missing auth token');
  
  jwt.verify(token, notSoSecret, (err, _infos) => {
    if (err) throw errorHandling(401, 'jwt malformed');
  });

  const imagePath = `localhost:3000/src/uploads/${imageName}`;

  const updatedRecipe = await putRecipeImage(id, imagePath);

  return updatedRecipe;
};

module.exports = {
  createRecipesService,
  getRecipesService,
  getRecipesByIdService,
  updateRecipeByIdService,
  deleteRecipeByIdService,
  putRecipeImageService,
};
