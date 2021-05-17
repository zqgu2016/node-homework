import { v4 as uuidv4 } from 'uuid';

export const initUsers = () => {
  return new Array(10).fill(undefined).map((v, i) => ({
    id: uuidv4(),
    login: `user${i}`,
    password: `user${i}`,
    age: Math.floor(Math.random() * 130) + 4,
    isDeleted: false
  }));
};
