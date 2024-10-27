// userController.js
const userService = require('../services/userService');
const User = require('../models/userModel');

// Función para obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'username'); // Retorna solo el campo "username"
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Función para agregar un usuario
const addUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = await userService.addUser(username, password);
        res.status(201).json({ message: 'Usuario agregado exitosamente', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Función para eliminar un usuario por ID
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await userService.deleteUserById(id);
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    try {
        const updatedUser = await userService.updateUserById(id, userData);
        res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addUser,
    deleteUser,
    getAllUsers,
    updateUserById
};
