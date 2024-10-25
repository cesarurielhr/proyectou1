const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken,taskController.getAllTasks);
router.get('/:id', authenticateToken,taskController.getTaskById);
router.post('/',authenticateToken, taskController.createTask);
router.put('/:idu',authenticateToken, taskController.updateTask);
router.delete('/:idd',authenticateToken, taskController.deleteTask);

module.exports = router;