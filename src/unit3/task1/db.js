import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize(
  'postgres://aieqfnay:fU2PTnRwE_syi_YaCmAjb1c_2MzCxv7o@queenie.db.elephantsql.com:5432/aieqfnay'
);

export const User = sequelize.define(
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
