const router = require('express').Router();
const {register, login} = require('../controllers/auth.controller');

// Register
router.post('/register', register);
//Log In
router.post('/login', login);

module.exports = router