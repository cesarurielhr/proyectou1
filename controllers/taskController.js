const tasksModel = require ('../models/tasks')

/*let task = [
  {
    id: 1,
    title: "Tarea 1",
    description: "Descripción de la Tarea 1",
  },
  {
    id: 2,
    title: "Tarea 2",
    description: "Descripción de la Tarea 2",
  },
  {
    id: 3,
    title: "Tarea 3",
    description: "Descripción de la Tarea 3",
  },
];*/
async function getAllTasks(req, res) {
  const tasks = await tasksModel.getAllTasks();
  
  if (tasks.length > 0) 
    res.status(200).json(tasks);
  else 
    res.status(404).json({ code:404, message: "No se encontraron tareas" });
}

async function createTask(req, res) {
  const newTask = 
    await tasksModel.createTask(req.body);
  res.status(200).json({message: "Tarea Creada",id: newTask.id});
}

async function getTaskById(req,res) {
  const {id}  = req.params; 
  console.log("Task ID: " + id);
  const task = await tasksModel.getTaskById(id);
    if(task) 
      res.status(200).json(task);
    else 
      res.status(404).json({ code: 404, message: "Tarea no encontrada" });
}

async function updateTask(req,res) {
  const {idu}  = req.params; 
  console.log("Task ID: " + idu);
  const data = req.body;
  const task = await tasksModel.updateTask(idu, data);
    if(task) 
      res.status(200).json({code:200, message:"Tareas actualizada exitosamente"});
    else 
      res.status(404).json({ code: 404, message: "Tarea no encontrada" });
  
}

async function deleteTask(req,res) {
  const {idd} = req.params; 
  
  const task = await tasksModel.deleteTask(idd);
    if(task) {
      res.status(200).json("Tarea eliminada exitosamente");
    }else {
      res.status(404).json({ code: 404, message: "Tarea no encontrada" });
    }
}


module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
