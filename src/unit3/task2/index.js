import express from 'express';

import { User } from './models';
import { db } from './services';
import { user as userRouter } from './routers';
import { initUsers } from '../utils';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', userRouter);

(async () => {
  try {
    await db.authenticate();
    await db.sync({ force: true });
    await User.bulkCreate(initUsers());
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
