import express from 'express';

import { User, Group } from './models';
import { db } from './services';
import { group, user as userRouter } from './routers';
import { group as groupRouter } from './routers';
import { initUsers, initGroups } from '../utils';

const app = express();
const router = express.Router();
const port = 3000;

app.use(express.json());

router.use(userRouter);
router.use(groupRouter);
app.use('/api', router);

(async () => {
  try {
    await db.authenticate();
    await db.sync({ force: true });

    const users = initUsers();
    const groups = initGroups();
    const groupsResult = await Group.bulkCreate(groups);
    const usersResult = await User.bulkCreate(users);
    await groupsResult[0].addUsers(usersResult.slice(0, 5), { through: { selfGranted: false } });
    await groupsResult[1].addUsers(usersResult.slice(5, 10), { through: { selfGranted: false } });

    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
