const express = require('express');
const bodyParser = require('body-parser');

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/tasks',taskRoutes);
app.use('/auth',authRoutes);


const PORT =  process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log('Presione CTRL + C para cerrar el server');
});

module.exports = app;