const { createRecipesService,
  getRecipesService,
  getRecipesByIdService,
  updateRecipeByIdService,
  deleteRecipeByIdService,
  putRecipeImageService } = require('../services/recipes.service');

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

const getRecipesByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await getRecipesByIdService(id);

    return res.status(200).json(recipe);
  } catch (error) {
    return next(error);
  }
};

const updateRecipeByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { body } = req;

    const editedRecipe = await updateRecipeByIdService(authorization, 
      body,
      id);

    return res.status(200).json(editedRecipe);
  } catch (error) {
    return next(error);
  }
};

const deleteRecipeByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;

    await deleteRecipeByIdService(authorization, id);

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

const putRecipeImageController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { filename } = req.file;

    console.log(filename);
    const updatedRecipe = await putRecipeImageService(id, filename, authorization);

    return res.status(200).json(updatedRecipe);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createRecipesController,
  getRecipesController,
  getRecipesByIdController,
  updateRecipeByIdController,
  deleteRecipeByIdController,
  putRecipeImageController,
};