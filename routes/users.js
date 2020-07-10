const router = require('express').Router();
const {
  getUsers,
  getUsersById,
  patchUser,
  patchAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUsersById);

router.patch('/me', patchUser);

router.patch('/me/avatar', patchAvatar);

module.exports = router;
