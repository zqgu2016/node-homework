import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import {
  initUsers,
  transformUser,
  getUsers,
  getAutoSuggestUsers
} from './utils';

const users = initUsers();

const app = express();
const port = 3000;
const router = express.Router();

router.get('/users', (req, res) => {
  try {
    const { loginSubstring, limit } = req.query;
    res.json({
      success: true,
      data: getAutoSuggestUsers(users, loginSubstring, limit).map((v) =>
        transformUser(v)
      )
    });
  } catch (_) {
    res.json({
      success: false
    });
  }
});

router.get('/users/:id', (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = getUsers(users).find((v) => v.id === userId);
    res.json({
      success: true,
      data: transformUser(user)
    });
  } catch (_) {
    res.json({
      success: false
    });
  }
});

router.post('/users', (req, res) => {
  try {
    const { login, password, age } = req.body;
    const newUser = {
      id: uuidv4(),
      login,
      password,
      age: age || -1,
      isDeleted: false
    };
    users.push(newUser);
    res.json({
      success: true,
      data: transformUser(newUser)
    });
  } catch (_) {
    res.json({
      success: false
    });
  }
});

router.put('/users/:id', (req, res) => {
  try {
    const { id: userId } = req.params;
    const userIndex = getUsers(users).findIndex((v) => v.id === userId);
    users[userIndex] = {
      ...users[userIndex],
      ...req.body
    };
    res.json({
      success: true,
      data: transformUser(users[userIndex])
    });
  } catch (_) {
    res.json({
      success: false
    });
  }
});

router.delete('/users/:id', (req, res) => {
  try {
    const { id: userId } = req.params;
    const userIndex = getUsers(users).findIndex((v) => v.id === userId);
    users[userIndex].isDeleted = true;
    res.json({
      success: true
    });
  } catch (_) {
    res.json({
      success: false
    });
  }
});

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
