// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.addUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUserById); // Ruta para actualizar usuario
router.get('/', userController.getAllUsers);

module.exports = router;
