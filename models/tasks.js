const { collection, getDocs,getDoc,doc, addDoc,setDoc,updateDoc, deleteDoc } = require("firebase/firestore");
const { v4: uuidv4 } = require("uuid");
const { db } = require("../firebaseConfig");
const { taskController } = require("../controllers/taskController");


async function getAllTasks() {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const tasks = querySnapshot.docs.map(doc => {
    
    data = doc.data();
    data.id = doc.id;

    return data;
  });

  return tasks;
}

async function getTaskById(id) {
 
  try {
 
    const docRef = doc(db, "tasks",id);  // Referencia al documento con el Id proporcionado
    const docSnap = await getDoc(docRef); // Obtén el documento

    if (docSnap.exists()) {
      const data = docSnap.data(); // Extrae los datos del documento
      data.id = docSnap.id;        // Incluye el id del documento en los datos
      return data;                 // Retorna los datos de la tarea
    } else {
      console.log("No se encontró ninguna tarea con ese ID.");
      return null;                 // Si no existe, retorna null o puedes manejar el error
    }
  } catch (error) {
    console.error("Error obteniendo la tarea:", error);
  }
}

async function createTask(data) {

  let docRef; 
  const newTask = {
    title: data.title,
    description: data.description,
    createdAt: data.createdAt,
    completed: false
  }
  try {
    docRef = await addDoc(collection(db, "tasks"), newTask);
    console.log("Document added with ID: ", docRef.id);
    newTask.id = docRef.id;


  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return newTask;
}

async function updateTask(id, data) {
  const taskRef = doc(db, "tasks", id); // Referencia al documento específico
  const editTask = {
    completed: data.completed
  };

  try {
    await updateDoc(taskRef, editTask); // Actualiza solo los campos especificados
    console.log("Documento actualizado con ID: ", id);
    editTask.id = id; // Incluye el ID del documento en los datos actualizados
  } catch (e) {
    console.error("Error actualizando el documento: ", e);
    throw new Error("Error actualizando la tarea");
  }

  return editTask;
}

async function deleteTask(id) {
  try {
    const taskRef = doc(db, "tasks", id);  // Referencia al documento con el ID proporcionado
    await deleteDoc(taskRef);              // Elimina el documento de Firestore
    console.log(`Tarea con ID: ${id} eliminada correctamente.`);
    return { success: true, message: `Tarea con ID: ${id} eliminada correctamente.` };
  } catch (e) {
    console.error("Error eliminando la tarea: ", e);
    throw new Error("Error eliminando la tarea");
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
}