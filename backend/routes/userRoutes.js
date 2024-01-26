const express = require('express');
const { createUser, getUsers, deleteUser } = require('../controllers/userController');
const router = express.Router();



router.get('/user',getUsers);
router.delete('/user/delete/:id',deleteUser);

module.exports = router