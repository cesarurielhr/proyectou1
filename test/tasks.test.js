const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');

const app = require('../index');


const expect = chai.expect;
let token;
let taskId2
//Pruebas para firebases 
// Primero se iniciamos sesion con el usuario que queremos
    before(async () => {
        const res = await request(app).post('/auth/login').send({ username: 'admin', password: '12345' });
        token = res.body.token;
        expect(token).to.be.a('string');
    });
//Muestra todas las tareas 
describe('GET ALL TASKS /tasks', () => {
    it('1. Deberia devolver todas las tareas con estatus 200 cuando hay tareas en Firebase', async () => {
        const res = await request(app).get('/tasks').set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        console.log(res.body);
      

    });
     });
// Muestra una tarea específica
describe('GET SPECIFIC TASK /tasks/:id', () => {
    it('2. Debería devolver una tarea con estatus 200 cuando la tarea existe en Firebase', async () => {
        const taskId = 'AkSZQbLCwowI9pycCLOM'; // ID DE LA TAREA 
        const res = await request(app).get(`/tasks/${taskId}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        console.log(res.body);
   
    });

});
// Muestra una tarea específica
describe('POST NEW TASK /tasks', () => {
    it('3. Debería devolver una tarea con estatus 200 cuando la tarea se haya creado en Firebase', async () => {
        const res = await request(app).post(`/tasks`).send(
        {
        title: "Tarea 5",
        description: "Descripción de para tarea de arjona",
        createdAt:"2024-10-29",
        completed:"false"
        }
        ).set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        console.log(res.body);
        taskId2 = res.body.id; 
    });
    
});

// Edita una tarea especifica
describe('PUT EDIT TASK /tasks/:idu', () => {
    it('4. Debería devolver una tarea con estatus 200 cuando la tarea se haya actualizado en Firebase', async () => {
         
        const res = await request(app).put(`/tasks/${taskId2}`).send(
        {
        completed:true
        }
        ).set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        console.log(res.body);
   
    });

});

// Elimna una tarea en espefico
describe('DELETE TASKS /tasks/:idd', () => {
    it('5. Debería devolver una tarea con estatus 200 cuando la tarea se haya eliminado en Firebase', async () => {
        const res = await request(app).delete(`/tasks/${taskId2}`).set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('string');
        console.log(res.body);     
    });
});





