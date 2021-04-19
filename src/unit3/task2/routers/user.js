import Router from 'express-promise-router';
import { createValidator } from 'express-joi-validation';
import Joi from 'joi';

import {
  getAutoSuggestUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../data-access/user';

const router = Router();
const validator = createValidator();

const REG_LETTERS_NUMBERS = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
const commonSchema = {
  login: Joi.string().required(),
  password: Joi.string().pattern(REG_LETTERS_NUMBERS).required().messages({
    'string.pattern': 'password must contain letters and numbers;'
  }),
  age: Joi.number().min(4).max(130).message('age must be between 4 and 130')
};
const createSchema = Joi.object({
  ...commonSchema
});
const updateSchema = Joi.object({
  ...commonSchema
}).fork(['login', 'password'], (schema) => schema.optional());

router.get('/users', async (req, res) => {
  try {
    const { loginSubstring, limit } = req.query;
    const users = await getAutoSuggestUsers(loginSubstring, limit);
    res.json({
      success: true,
      data: users
    });
  } catch (err) {
    res.json({
      success: false,
      message: err
    });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await getUser(userId);
    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    res.json({
      success: false,
      message: err
    });
  }
});

router.post('/users', validator.body(createSchema), async (req, res) => {
  try {
    const { login, password, age } = req.body;
    const user = await createUser({ login, password, age });
    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    res.json({
      success: false,
      message: err
    });
  }
});

router.put('/users/:id', validator.body(updateSchema), async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { login, password, age } = req.body;
    const user = await updateUser({ userId, login, password, age });
    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    res.json({
      success: false,
      message: err
    });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const { id: userId } = req.params;
    await deleteUser(userId);
    res.json({
      success: true
    });
  } catch (err) {
    res.json({
      success: false,
      message: err
    });
  }
});

export default router;
