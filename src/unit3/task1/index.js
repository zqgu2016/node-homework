import express from 'express';
import { createValidator } from 'express-joi-validation';
import Router from 'express-promise-router';
import Joi from 'joi';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { sequelize, User } from './db';
import { initUsers } from '../utils';

const app = express();
const port = 3000;
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
    const users = await User.findAll({
      where: {
        login: {
          [Op.like]: `%${loginSubstring}%`
        },
        isDeleted: false
      },
      limit
    });
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
    const user = await User.findOne({
      where: {
        id: userId,
        isDeleted: false
      },
      plain: true
    });

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
    const newUser = await User.create(
      {
        id: uuidv4(),
        login,
        password,
        age,
        isDeleted: false
      }
    );
    const plainUser = newUser.get({ plain: true });
    delete plainUser.password;
    delete plainUser.isDeleted;
    res.json({
      success: true,
      data: plainUser
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
    const user = await User.update(
      {
        login,
        password,
        age,
        isDeleted: false
      },
      {
        where: {
          id: userId
        },
        returning: true,
        plain: true
      }
    );
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
    await User.update(
      {
        isDeleted: true
      },
      {
        where: {
          id: userId
        }
      }
    );
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

app.use(express.json());
app.use('/api', router);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await User.bulkCreate(initUsers());
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
