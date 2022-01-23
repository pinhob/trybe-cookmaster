const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { createRecipes,
  getRecipes } = require('../models/recipes.model');
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

module.exports = {
  createRecipesService,
  getRecipesService,
};
