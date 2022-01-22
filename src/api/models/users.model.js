const connect = require('./connection');

const createUser = async (name, email, password) => {
  const conn = await connect();

  const user = {
    name,
    email,
    password,
    role: 'user',
  };

  const insertUser = await conn.collection('users').insertOne(user);

  return insertUser;
};

module.exports = {
  createUser,
  
};
