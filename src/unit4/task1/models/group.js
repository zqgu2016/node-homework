import { DataTypes } from 'sequelize';

import { db as sequelize } from '../services';

const Group = sequelize.define(
  'groups',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    permissions: DataTypes.ARRAY(DataTypes.STRING)
  },
  {
    defaultScope: {
      attributes: { exclude: ['password', 'isDeleted'] }
    }
  }
);

export default Group;
