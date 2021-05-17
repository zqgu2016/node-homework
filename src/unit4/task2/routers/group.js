import Router from 'express-promise-router';

import {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup
} from '../data-access/group';

const router = Router();

router.get('/groups', async (req, res) => {
  try {
    const groups = await getGroups();
    res.json({
      success: true,
      data: groups
    });
  } catch (err) {
    res.json({
      success: false,
      message: err
    });
  }
});

router.get('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await getGroup(groupId);
    res.json({
      success: true,
      data: group
    });
  } catch (err) {
    res.json({
      success: false,
      message: err
    });
  }
});

router.post('/groups', async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const group = await createGroup({ name, permissions });
    res.json({
      success: true,
      data: group
    });
  } catch (err) {
    res.json({
      success: false,
      message: err
    });
  }
});

router.put('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, permissions } = req.body;
    const group = await updateGroup({ groupId, name, permissions });
    res.json({
      success: true,
      data: group
    });
  } catch (err) {
    res.json({
      success: false,
      message: err
    });
  }
});

router.delete('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    await deleteGroup(groupId);
    res.json({
      success: true
    });
  } catch (err) {
    res.json({
      success: false,
      message: err
    });
  }
});

export default router;
