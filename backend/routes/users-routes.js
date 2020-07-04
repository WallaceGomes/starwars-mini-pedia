const { Router } = require('express');

const router = Router();

const userController = require('../controllers/user-controller');

router.post('/signup', userController.userSignup);

router.post('/login', userController.userLogin);

router.delete('/:userId', userController.userDelete);

module.exports = router;
