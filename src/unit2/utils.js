import { v4 as uuidv4 } from 'uuid';

export const getUsers = (users) => {
  return users.filter((user) => !user.isDeleted);
};

export const getAutoSuggestUsers = (users, loginSubstring, limit) => {
  return getUsers(users)
    .filter((user) => user.login.indexOf(loginSubstring) !== -1)
    .slice(0, limit);
};

export const initUsers = () => {
  return new Array(100).fill(undefined).map((v, i) => ({
    id: uuidv4(),
    login: `user${i}`,
    password: `user${i}`,
    age: Math.floor(Math.random() * 130) + 4,
    isDeleted: false
  }));
};

export const transformUser = ({ id, login, age }) => {
  return {
    id,
    login,
    age
  };
};
