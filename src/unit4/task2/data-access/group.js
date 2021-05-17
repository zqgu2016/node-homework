import { v4 as uuidv4 } from 'uuid';

import { User, Group } from '../models';

export const getGroups = async () => {
  return await Group.findAll({
    include: [
      {
        model: User,
        as: 'users'
      }
    ]
  });
};

export const getGroup = async (groupId) => {
  const group = await Group.findByPk(groupId, {
    include: [
      {
        model: User,
        as: 'users'
      }
    ],
    plain: true
  });
  return group;
};

export const createGroup = async ({ name, permissions }) => {
  const newGroup = await Group.create({
    id: uuidv4(),
    name,
    permissions
  });
  return newGroup.get({ plain: true });
};

export const updateGroup = async ({ groupId, name, permissions }) => {
  const group = await Group.update(
    {
      name,
      permissions
    },
    {
      where: {
        id: groupId
      },
      returning: true,
      plain: true
    }
  );
  return group;
};

export const deleteGroup = async (groupId) => {
  await Group.destroy({
    where: {
      id: groupId
    }
  });
};
