const router = require('express').Router();
const {
  getUsers,
  getUsersById,
  createUser,
  patchUser,
  patchAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUsersById);

router.post('/', createUser);

router.patch('/me', patchUser);

router.patch('/me/avatar', patchAvatar);

module.exports = router;
