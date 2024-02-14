// routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// const { signup, login, logout } = require('../controllers/authController');



// admin
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.post('/admin/signup', userController.createUser);
router.delete('/users/:id', userController.deleteUser);



// user
// router.post('/signup', signup);
// router.post('/login', login);
// router.post('/logout', logout);

module.exports = router;
