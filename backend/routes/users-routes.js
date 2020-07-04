const { Router } = require('express');

const router = Router();

const userController = require('../controllers/user-controller');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.use(checkAuth);

router.get('/', userController.index);

router.put('/:userId', userController.update);

router.delete('/:userId', userController.delete);

module.exports = router;
