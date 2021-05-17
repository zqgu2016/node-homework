import { v4 as uuidv4 } from 'uuid';

import Group from '../models/group';

export const getGroups = async () => {
  return await Group.findAll();
};

export const getGroup = async (groupId) => {
  const group = await Group.findOne({
    where: {
      id: groupId
    },
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
