const { createUserService } = require('../services/users.service');

const createUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await createUserService(name, email, password);

    return res.status(201).json(newUser);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUserController,
};
