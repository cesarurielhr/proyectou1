
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "process.env.FIREBASE_API_KEY",
  authDomain: "proyectou1servweb.firebaseapp.com",
  projectId: "proyectou1servweb",
  storageBucket: "proyectou1servweb.appspot.com",
  messagingSenderId: "124257092737",
  appId: "1:124257092737:web:22e8bfe1b8e441aa483980",
  measurementId: "G-QBF4KZRPVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Cloud Firestore y obtener una referencia al servicio
const db = getFirestore(app);

// Exportar la instancia de la aplicación y la base de datos
module.exports = { app, db };
