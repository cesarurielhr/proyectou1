// taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/:username/tareas', taskController.addTaskToUser);
router.get('/:username/tareas', taskController.getTasksByUser);
router.put('/:username/tareas/:taskId', taskController.updateTaskById);
router.delete('/:username/tareas/:taskId', taskController.deleteTaskById);

module.exports = router;
