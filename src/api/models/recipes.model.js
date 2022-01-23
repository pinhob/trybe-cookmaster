const { ObjectId } = require('mongodb');
const connect = require('./connection');
const errorHandling = require('../utils/errorHandling');

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

  console.log(recipe);

  return recipe;
};

module.exports = {
  createRecipes,
  getRecipes,
  getRecipesById,
};