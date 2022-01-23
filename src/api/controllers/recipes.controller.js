const { createRecipesService,
  getRecipesService } = require('../services/recipes.service');

const createRecipesController = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { name, ingredients, preparation } = req.body;
  
    const newRecipe = await createRecipesService(authorization, name, ingredients, preparation);
  
    return res.status(201).send(newRecipe);
  } catch (error) {
    return next(error);
  }
};

const getRecipesController = async (req, res, next) => {
  try {
    const recipes = await getRecipesService();

    return res.status(200).json(recipes);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createRecipesController,
  getRecipesController,
};