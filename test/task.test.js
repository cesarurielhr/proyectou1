const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');

const app = require('../index');
const taskController = require('../controllers/taskController');

const expect = chai.expect;
describe('GET /tasks',()=>{
    it('1. Deberia devolver todas las tareas con estatus 200 cuando hay tareas',async ()=>{
    const tasks = [
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
    ];
    const res = await request(app).get('/tasks');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(3);
    expect(res.body).to.deep.equal(tasks);
});
});
