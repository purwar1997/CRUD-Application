const express = require('express');
const router = express.Router();

const {
  home,
  getUsers,
  createUser,
  getUser,
  editUser,
  deleteUser,
} = require('../controllers/routehandlers');

router.get('/', home);
router.get('/getUsers', getUsers);
router.post('/createUser', createUser);
router.get('/getUser/:userId', getUser);
router.put('/editUser/:userId', editUser);
router.delete('/deleteUser/:userId', deleteUser);

module.exports = router;
