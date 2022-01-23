const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const conn = await connect();

  const newRecipe = {
    name,
    ingredients,
    preparation,
    userId,
  };

  const { insertedId: _id } = await conn.collection('recipes').insertOne(newRecipe);

  return { _id, ...newRecipe };
};

const getRecipes = async () => {
  const conn = await connect();

  const recipes = await conn.collection('recipes').find({}).toArray();

  return recipes;
};

const getRecipesById = async (id) => {
  const conn = await connect();

  const recipe = await conn.collection('recipes').findOne({ _id: ObjectId(id) });

  return recipe;
};

const updateRecipeById = async (name, ingredients, preparation, id) => {
  const conn = await connect();

  const productId = { _id: new ObjectId(id) };

  const updateValues = { $set: { name, ingredients, preparation } };

  await conn.collection('recipes').updateOne(productId, updateValues);

  const editedRecipe = await getRecipesById(id);

  return editedRecipe;
};

const deleteRecipeById = async (id) => {
  const conn = await connect();

  const recipe = await conn.collection('recipes').deleteOne({ _id: ObjectId(id) });

  return recipe;
};

module.exports = {
  createRecipes,
  getRecipes,
  getRecipesById,
  updateRecipeById,
  deleteRecipeById,
};