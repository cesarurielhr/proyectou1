const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://linodiaz:20400727@tasks.15ipg.mongodb.net/?retryWrites=true&w=majority&appName=Tasks');
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Detener el proceso si hay un error
    }
};

module.exports = connectDB;
