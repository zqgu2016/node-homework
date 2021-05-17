import User from './user';
import Group from './group';

User.belongsToMany(Group, {
  through: 'user_group',
  as: 'groups',
  foreignKey: 'user_id'
});

Group.belongsToMany(User, {
  through: 'user_group',
  as: 'users',
  foreignKey: 'group_id'
});

export {
  User,
  Group
};
