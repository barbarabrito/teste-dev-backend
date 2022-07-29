const app = require('../api/index');
const request = require('supertest');
const mongoose = require('mongoose');

describe('Testing customers route', ()=> {

    beforeAll(() => {
        mongoose.connect('mongodb://localhost:27017/dbapi');
    });
    
    afterAll( async () => {
       mongoose.connection.close();
    });

    describe('POST /customers', () => {
    
        it('should create a customer', async () => {
            const response = await request(app)
            .post('/customers')
            .send({
                name:'oompa loompa',
                birthDate: '02/02/2020',
                sex: 'feminino',
                healthIssues:[{
                    'name':'diabetes',
                    'degree':2
                }]
            })
            .set('Accept', 'application/json')
            expect(response.status).toBe(201)
        });
    
    });
    
    describe('POST error messages test', () => {
    
        it('should respond with a status code of 400 if required fields are missing', async () => {
            const customer = {
                name: 'loompa oompa',
                //birthDate: 'dd/mm/yyyy' missing
                sex: 'feminino',
                healthIssues: [{
                    'name': 'diabetes',
                    'degree': 2
                }]
            };
            const response = await request(app).post("/customers").send(customer)
            expect(response.statusCode).toBe(400)
        });

        it('should respond with error message if value of degree is different from 1 or 2', async ()=> {
            const customer = {
                name: 'patamon',
                birthDate: '07/03/1999',
                sex: 'masculino',
                healthIssues: [{
                    'name': 'tinnitus',
                    'degree': 3
                }]
            };
            const response = await request(app).post("/customers").send(customer)
            expect(response.statusCode).toBe(400)
            expect(response.body).toBe('Health issues degree should only be 1 or 2')
        });
    });
    
    describe('GET /customers/:id NOT FOUND', () => {
    
        it('should return 404 status when customer is not found', async () => {
            const id = '62df07a3b002603e500e1d5a';
            const response = await request(app).get(`/customers/${id}`)
            expect(response.statusCode).toBe(404);
        });
    
        it('should respond "Not Found" in JSON when customer is not found', async () => {
            const id = '62df07a3b002603e500e1d5a';
            const response = await request(app).get(`/customers/${id}`)
            expect(response.body).toBe('Not Found');
        });
    });
    
    describe('GET /customers', () => {
    
        it('should respond with 200 status', async () => {
            const response = await request(app).get('/customers')
            expect(response.statusCode).toBe(200);
        });
    
        it("should respond an object", async () => {
            const response = await request(app).get('/customers')
            expect(response.body).toBeInstanceOf(Object);
        });
    });
});