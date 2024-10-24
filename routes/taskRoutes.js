const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')


router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:idu', taskController.updateTask);
router.delete('/:idd', taskController.deleteTask);

module.exports = router;