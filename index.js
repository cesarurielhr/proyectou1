const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('./mongo/mondbConfig');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const User = require('./models/userModel');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Conectar a la base de datos y luego iniciar el servidor
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
});

module.exports = app;
