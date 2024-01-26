const express = require('express');
const { signUp, signIn, logOut,  } = require('../controllers/authController');
const router = express.Router();



router.post('/user/signup',signUp);
router.post('/user/signin',signIn);
router.get('/user/logout',logOut);

module.exports = router