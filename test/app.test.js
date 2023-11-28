import chai from 'chai';
import supertest from 'supertest';
import nock from 'nock';
import app from '../src/app.js';

const { expect } = chai;
const request = supertest(app);

describe('REST API Tests', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should get data from /data endpoint', async () => {
    const expectedData = [{ id: 1, name: 'Test' }]; 
    nock('http://localhost')
      .get('/data')
    .reply(200, expectedData);

    const response = await request.get('/data');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(expectedData);
  });

  it('should post data to /data/p endpoint', async () => {
    const newData = { id: 2, name: 'NewTest' };
    nock('http://localhost')
      .post('/data/p', newData)
      .reply(201, { message: 'Data received successfully', data: newData });

    const response = await request.post('/data/p').send(newData);

    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal({ message: 'Data received successfully', data: newData });
  });

  it('should update data at /data/:id endpoint', async () => {
    const updatedData = { id: 1, name: 'UpdatedTest' };
    nock('http://localhost')
      .put('/data/1', updatedData)
      .reply(200, { message: 'Data with id 1 updated successfully', data: updatedData });

    const response = await request.put('/data/1').send(updatedData);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      message: 'Data with id 1 updated successfully',
      data: updatedData,
    });
  });

  it('should delete data at /data/:id endpoint', async () => {
    const idToDelete = 1;
    nock('http://localhost')
      .delete(`/data/${idToDelete}`)
      .reply(200, { message: `Data with id ${idToDelete} deleted successfully` });

    const response = await request.delete(`/data/${idToDelete}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      message: `Data with id ${idToDelete} deleted successfully`,
    });
  });
});


