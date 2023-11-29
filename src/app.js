import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs/promises';


const app = express();
// const nock = require('nock');
app.use(bodyParser.json());

// nock('http://127.0.0.1/archivo')
//   .get('/data')
//   .reply(200, { key: 'value', message: 'Hello from the simulated API!'  });

let data = [];

try {
  const fileData = await fs.readFile('archivo.json', 'utf-8');
  data = JSON.parse(fileData);
} catch (error) {
  console.error('Error reading the JSON file:', error);
}

app.get('/data', (req, res) => {
  res.json(data);
});

app.post('/data/p', async (req, res) => {
  try {
    const ndata = req.body;
    data.push(ndata);

    await fs.writeFile('archivo.json', JSON.stringify(data));

    res.status(201).json({ message: 'Data received successfully', data: ndata });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the request');
  }
});

app.put('/data/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const uproductos = req.body;

    data = data.map(item => (item.id === id ? uproductos : item));

    await fs.writeFile('archivo.json', JSON.stringify(data));

    res.json({ message: `Data with id ${id} updated successfully`, data: uproductos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the PUT request');
  }
});

app.delete('/data/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    data = data.filter(item => item.id !== id);

    await fs.writeFile('archivo.json', JSON.stringify(data));

    res.json({ message: `Data with id ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the DELETE request');
  }
});

export default app;