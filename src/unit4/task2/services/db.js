import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'postgres://aieqfnay:fU2PTnRwE_syi_YaCmAjb1c_2MzCxv7o@queenie.db.elephantsql.com:5432/aieqfnay'
);

export default sequelize;
