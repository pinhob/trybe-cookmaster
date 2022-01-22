const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { createUser,
  findUserByEmail } = require('../models/users.model');
const errorHandling = require('../utils/errorHandling');

const userValidateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginValidateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const notSoSecret = 'seusecretdetoken';

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

const getLoginService = async (email, password) => {
  const { error } = loginValidateSchema.validate({ email, password });

  if (error) throw errorHandling(401, 'All fields must be filled');

  const emailExists = await findUserByEmail(email);

  if (!emailExists) throw errorHandling(401, 'Incorrect username or password');
 
  const passwordsMatch = emailExists.password === password;

  if (!passwordsMatch) throw errorHandling(401, 'Incorrect username or password');

  const { _id, role } = emailExists;
  
  const token = jwt.sign({ _id, role, email }, notSoSecret);

  return token;
};

module.exports = {
  createUserService,
  getLoginService,
};
