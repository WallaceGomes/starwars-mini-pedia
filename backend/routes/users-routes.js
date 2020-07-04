const { Router } = require('express');

const router = Router();

const userController = require('../controllers/user-controller');

router.post('/signup', userController.userSignup);

router.get('/', userController.getUsers);

router.post('/login', userController.userLogin);

// router.put('/:userId', userController.editUser);

router.delete('/:userId', userController.userDelete);

module.exports = router;
