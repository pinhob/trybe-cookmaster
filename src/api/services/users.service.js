const Joi = require('joi');

const { createUser,
  findUserByEmail,
  getLogin } = require('../models/users.model');
const errorHandling = require('../utils/errorHandling');

const userValidateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateUserWithJoi = (name, email, password) => {
  const { error } = userValidateSchema.validate({ name, email, password });

  if (error) throw errorHandling(400, 'Invalid entries. Try again.');

  return true;
};

const createUserService = async (name, email, password) => {
  validateUserWithJoi(name, email, password);

  const emailAlreadyExists = await findUserByEmail(email);

  if (emailAlreadyExists) throw errorHandling(409, 'Email already registered');

  const user = await createUser(name, email, password);

  return { user };
};

const getLoginService = (email, password) => {

};

module.exports = {
  createUserService,
  getLoginService,
};
