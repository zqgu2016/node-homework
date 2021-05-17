import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { User, Group } from '../models';

export const getAutoSuggestUsers = async (loginSubstring, limit) => {
  const users = await User.findAll({
    include: [
      {
        model: Group,
        as: 'groups'
      }
    ],
    where: {
      login: {
        [Op.like]: `%${loginSubstring}%`
      },
      isDeleted: false
    },
    limit
  });
  return users;
};

export const getUser = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Group,
        as: 'groups'
      }
    ],
    where: {
      id: userId,
      isDeleted: false
    },
    plain: true
  });
  return user;
};

export const createUser = async ({ login, password, age }) => {
  const newUser = await User.create({
    id: uuidv4(),
    login,
    password,
    age,
    isDeleted: false
  });
  const plainUser = newUser.get({ plain: true });
  delete plainUser.password;
  delete plainUser.isDeleted;
  return newUser;
};

export const updateUser = async ({ userId, login, password, age }) => {
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
  return user;
};

export const deleteUser = async (userId) => {
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
};
