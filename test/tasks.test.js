const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');

const app = require('../index');
const taskController = require('../controllers/taskController');

const expect = chai.expect;
let token;

//Pruebas para firebases 
// Como primer paso nos autenticamos para poder realizar la consulta
    before(async () => {
        const res = await request(app).post('/auth/login').send({ username: 'admin', password: '12345' });
        token = res.body.token;
        expect(token).to.be.a('string');
    });
//Muestra todas las tareas 
describe('GET ALL TASKS /tasks', () => {
    //Seguidamente con el token valido realizamos la consulta
    it('7, Deberia devolver todas las tareas con estatus 200 cuando hay tareas en Firebase', async () => {
        const res = await request(app).get('/tasks').set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        
      

    });
     });
// Muestra una tarea específica
describe('GET SPECIFIC TASK /tasks/:id', () => {
    it('Debería devolver una tarea con estatus 200 cuando la tarea existe en Firebase', async () => {
        const taskId = 'AkSZQbLCwowI9pycCLOM'; // Reemplaza con un ID real de tarea para la prueba
        const res = await request(app).get(`/tasks/${taskId}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
   
    });
});









