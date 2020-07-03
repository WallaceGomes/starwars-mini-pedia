const { Router } = require('express');

const router = Router();

const userControlers = require('../controllers/user-controllers');

router.post('/signup', userControlers.userSignup);

router.post('/login', userControlers.userLogin);

router.delete('/:userId', userControlers.userDelete);

module.exports = router;
