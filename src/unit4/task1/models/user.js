import { DataTypes } from 'sequelize';

import { db as sequelize } from '../services';

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    isDeleted: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    defaultScope: {
      attributes: { exclude: ['password', 'isDeleted'] }
    }
  }
);

export default User;
