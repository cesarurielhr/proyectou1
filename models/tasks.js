const { collection, getDocs,getDoc,doc, addDoc,setDoc,updateDoc, deleteDoc } = require("firebase/firestore");
const { v4: uuidv4 } = require("uuid");
const { db } = require("../firebaseConfig");
const { taskController } = require("../controllers/taskController");


async function getAllTasks(username) {
  const querySnapshot = await getDocs(collection(db, "users",username,"tasks"));
  const tasks = querySnapshot.docs.map(doc => {
    
    data = doc.data();
    data.id = doc.id;

    return data;
  });

  return tasks;
}

async function getTaskById(username, id) {
 
  try {
 
    const docRef = doc(db, "users",username,"tasks",id);  
    const docSnap = await getDoc(docRef); 

    if (docSnap.exists()) {
      const data = docSnap.data(); 
      data.id = docSnap.id;        
      return data;                 
    } else {
      console.log("No se encontró ninguna tarea con ese ID.");
      return null;                 
    }
  } catch (error) {
    console.error("Error obteniendo la tarea:", error);
  }
}

async function createTask(username,data) {

  let docRef; 
  const newTask = {
    title: data.title,
    description: data.description,
    createdAt: data.createdAt,
    completed: false
  }
  try {
    docRef = await addDoc(collection(db, "users",username,"tasks"), newTask);
    console.log("Document added with ID: ", docRef.id);
    newTask.id = docRef.id;


  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return newTask;
}

async function updateTask(username,id, data) {
  const taskRef = doc(db,"users",username, "tasks", id); 
  const editTask = {
    completed: data.completed
  };

  try {
    await updateDoc(taskRef, editTask);
    console.log("Documento actualizado con ID: ", id);
    editTask.id = id; 
  } catch (e) {
    console.error("Error actualizando el documento: ", e);
    throw new Error("Error actualizando la tarea");
  }

  return editTask;
}

async function deleteTask(username,id) {
  try {
    const taskRef = doc(db,"users",username, "tasks", id); 
   const taskSnap = await getDoc(taskRef); // Verificar si el documento existe
    
    if (taskSnap.exists()) {
      await deleteDoc(taskRef);  
      console.log(`Tarea con ID: ${id} eliminada correctamente.`);
      return true;
    } else {
      console.log(`Tarea con ID: ${id} no se encontró.`);
      return false;
    }
  } catch (e) {
    console.error("Error eliminando la tarea: ", e);
    
}
}

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
}