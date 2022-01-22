const { createRecipesService } = require('../services/recipes.service');

const createRecipesController = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { name, ingredients, preparation } = req.body;
  
    const newRecipe = await createRecipesService(authorization, name, ingredients, preparation);
  
    return res.status(201).send(newRecipe);
  } catch (error) {
    console.log(error.status, error.message);
    return next(error);
  }
};

module.exports = {
  createRecipesController,
};