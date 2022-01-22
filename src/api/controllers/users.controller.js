const { createUserService } = require('../models/users.model');

// inserir validação pelo joi

const createUserController = (req, res, next) => {
  try {
    // inserir lógica
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUserController,
};
