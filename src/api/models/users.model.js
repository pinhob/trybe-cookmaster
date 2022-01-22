const connect = require('./connection');

const findUserByEmail = async (email) => {
  const conn = await connect();

  const findByEmail = await conn.collection('users').findOne({ email });

  return findByEmail;
};

const createUser = async (name, email, password) => {
  const conn = await connect();

  const user = {
    name,
    email,
    password,
    role: 'user',
  };

  const { insertedId: _id } = await conn.collection('users').insertOne(user);
  
  const { role } = user;

  return { name, email, role, _id };
};

module.exports = {
  createUser,
  findUserByEmail,
};
