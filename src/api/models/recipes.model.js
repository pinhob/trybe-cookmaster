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

module.exports = {
  createRecipes,
};