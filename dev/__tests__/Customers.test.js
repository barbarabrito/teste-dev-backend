const app = require('../api/index');
const request = require('supertest');
const mongoose = require('mongoose');

describe('POST /customers', () => {
    it('should create a customer', async () => {
        const response = await request(app)
            .post('/customers')
            .send({
                name:'oompa loompa',
                birthDate: '02/02/2020',
                sex: 'female',
                healthIssues:[{
                    'name':'diabetes',
                    'degree':2
                }]
            })
            .set('Accept', 'application/json')
            expect(response.status).toBe(201)
            // mongoose.connection.close();
        });
});

describe('GET /customers', () => {

    it('should respond all customers in JSON', async () => {
        const response = await request(app).get("/customers").send();
        expect(response.statusCode).toBe(200);
    });
    
    it("should respond an object", async () => {
        const response = await request(app).get("/customers").send();
        expect(response.body).toBeInstanceOf(Object);
        mongoose.connection.close();
    });
    
});