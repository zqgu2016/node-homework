import express from 'express';

import { User, Group } from './models';
import { db } from './services';
import { user as userRouter } from './routers';
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
    await Group.bulkCreate(initGroups());
    await User.bulkCreate(initUsers());
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
