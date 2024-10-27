// userService.js
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

async function addUser(username, password) {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('El nombre de usuario ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, tasks: [] });
    await newUser.save();
    return newUser;
}

async function deleteUserById(id) {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
        throw new Error('Usuario no encontrado');
    }
    return deletedUser;
}

// Actualizar un usuario por ID
async function updateUserById(id, userData) {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    user.username = userData.username || user.username;
    if (userData.password) {
        user.password = await bcrypt.hash(userData.password, 10);
    }

    await user.save();
    return user;
}

module.exports = {
    addUser,
    deleteUserById,
    updateUserById
};
