const { Router } = require('express');

const router = Router();
const { body } = require('express-validator');

const userController = require('../controllers/user-controller');
const checkAuth = require('../middleware/check-auth');

router.post('/signup',
	[
		body('name').not().isEmpty(),
		body('email').isEmail(),
		body('password').not().isEmpty().isLength({ min: 6 }),
	],
	userController.signup);

router.post('/login',
	[
		body('password').not().isEmpty(),
		body('email').isEmail(),
	],
	userController.login);

router.post('/forgot', userController.forgotPassword);

router.patch('/reset/:resetLink', userController.resetPass);

router.use(checkAuth);

router.get('/', userController.index);

router.patch('/:userId',
	[
		body('name').not().isEmpty(),
		body('email').isEmail(),
	],
	userController.update);

router.delete('/:userId', userController.delete);

module.exports = router;
