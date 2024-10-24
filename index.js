const express = require('express');
const bodyParser = require('body-parser');

const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/tasks',taskRoutes);

const PORT =  3000;

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log('Press CTRL + C to stop the server');
});

module.exports = app;