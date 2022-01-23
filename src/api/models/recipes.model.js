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

module.exports = {
  createRecipes,
  getRecipes,
};