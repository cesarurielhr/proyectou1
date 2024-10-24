const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')


router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:idu', taskController.updateTask);
router.delete('/:idd', taskController.deleteTask);

/*
router.put('/', (req, res) => {

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskDeleted = taskController.deleteTask(id);
    res.status(200).json(taskDeleted);
});
*/
module.exports = router;