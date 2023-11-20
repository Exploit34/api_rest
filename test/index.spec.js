import app from '../src/app'
import request  from 'supertest'

describe('GET', () => {
    test('respuesta del endpoint de respuesta de los datos', async () => {
        const response = await request(app)
        .get('/data')
        .send()

        expect(response.statusCode).toBe(200);
    });

    test('respuesta de la data', async () => {
        const response = await request(app)
            .get('/data')
            .send(console.log('/data'))
        expect(response.statusCode).toBe(200);
    })
});

describe('POST', () => {
    test('respuesta del endpoint que guarden los datos', async () => {
        const response = await request(app)
            .post('/data/p')
            .send( { "id": 1234, "name": "typo", "ano": "1921", "location": "GER"} );

        expect(response.statusCode).toBe(201);
    });
});

describe('PUT', () => {
    test('respuesta del endpoint que actualize los datos', async () => {
        const i = { "id": 1234, "name": "cheyyitw", "ano": "1921", "location": "GER"}
        const response = await request(app)
            .put('/data/1234')
            .send(i);

        expect(response.statusCode).toBe(200);
    });
});

describe('DEL', () => {
    test('respuesta del endpoint que borre los datos', async () => {
        const response = await request(app)
            .delete('/data/1234')

        expect(response.statusCode).toBe(200);
    });
});