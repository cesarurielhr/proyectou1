const tasksModel = require ('../models/tasks')
const authController = require ('../middleware/authMiddleware');

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
  const username = req.user.username;  // Obtener el nombre de usuario de la petición del usuario logueado
  const tasks = await tasksModel.getAllTasks(username);
  console.log(req.user.username);
  if (tasks.length > 0) 
    res.status(200).json(tasks);
  else 
    res.status(404).json({ code:404, message: "No se encontraron tareas" });
}

async function createTask(req, res) {
   const username = req.user.username;  // Obtener el nombre de usuario de la petición del usuario logueado
  const newTask = 
    await tasksModel.createTask(username,req.body);
  res.status(200).json({message: "Tarea Creada",id: newTask.id});
}

async function getTaskById(req,res) {
  const username = req.user.username;  // Obtener el nombre de usuario de la petición del usuario logueado
  const {id}  = req.params; 
  console.log("Task ID: " + id);
  const task = await tasksModel.getTaskById(username,id);
    if(task) 
      res.status(200).json(task);
    else 
      res.status(404).json({ code: 404, message: "Tarea no encontrada" });
}

async function updateTask(req,res) {
  const username = req.user.username;  // Obtener el nombre de usuario de la petición del usuario logueado
  const {idu}  = req.params; 
  console.log("Task ID: " + idu);
  const data = req.body;
  const task = await tasksModel.updateTask(username,idu, data);
    if(task) 
      res.status(200).json({code:200, message:"Tareas actualizada exitosamente"});
    else 
      res.status(404).json({ code: 404, message: "Tarea no encontrada" });
  
}

async function deleteTask(req,res) {
  const username = req.user.username;  // Obtener el nombre de usuario de la petición del usuario logueado
  const {idd} = req.params; 
  
  const task = await tasksModel.deleteTask(username,idd);
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
