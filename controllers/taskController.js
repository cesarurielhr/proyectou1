// taskController.js
const taskService = require('../services/taskService');

// Controlador para agregar una tarea a un usuario
async function addTaskToUser(req, res) {
    const username = req.params.username;
    const taskData = req.body;

    try {
        const newTask = await taskService.addTaskToUser(username, taskData);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la tarea al usuario' });
    }
}

// Controlador para obtener las tareas de un usuario
async function getTasksByUser(req, res) {
    const username = req.params.username;

    try {
        const tasks = await taskService.getTasksByUser(username);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas del usuario' });
    }
}

// Actualizar una tarea de un usuario
async function updateTaskById(req, res) {
    const username = req.params.username;
    const taskId = req.params.taskId;
    const taskData = req.body;

    try {
        const updatedTask = await taskService.updateTaskById(username, taskId, taskData);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar una tarea de un usuario
async function deleteTaskById(req, res) {
    const username = req.params.username;
    const taskId = req.params.taskId;

    try {
        const deletedTask = await taskService.deleteTaskById(username, taskId);
        res.status(200).json({ message: 'Tarea eliminada exitosamente', task: deletedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addTaskToUser,
    getTasksByUser,
    updateTaskById,
    deleteTaskById
};