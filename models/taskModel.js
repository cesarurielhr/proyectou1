// taskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    username: { type: String, required: true }, // Relación con el usuario
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
