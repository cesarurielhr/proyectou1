// taskService.js
const User = require('../models/userModel');

// Agregar una tarea al usuario
async function addTaskToUser(username, taskData) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    user.tasks.push({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status || false
    });

    await user.save();
    return user.tasks[user.tasks.length - 1];
}

// Obtener todas las tareas de un usuario específico
async function getTasksByUser(username) {
    const user = await User.findOne({ username }, 'tasks');
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return user.tasks;
}

// Actualizar una tarea por ID
async function updateTaskById(username, taskId, taskData) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const task = user.tasks.id(taskId);
    if (!task) {
        throw new Error('Tarea no encontrada');
    }

    task.title = taskData.title || task.title;
    task.description = taskData.description || task.description;
    task.status = taskData.status !== undefined ? taskData.status : task.status;

    await user.save();
    return task;
}


async function deleteTaskById(username, taskId) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // Usar pull para eliminar la tarea con el ID especificado
    const task = user.tasks.id(taskId);
    if (!task) {
        throw new Error('Tarea no encontrada');
    }

    user.tasks.pull(taskId); // Usa pull para eliminar la tarea de la lista
    await user.save(); // Guarda los cambios en el usuario
    return task;
}

module.exports = {
    addTaskToUser,
    getTasksByUser,
    updateTaskById,
    deleteTaskById
};
