const express = require('express');
const path = require('path');
const api = require('./index')
const fs = require('fs')
const utility = require('util');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));
app.use('/api', api);

app.get('/', (req, res) => res.send('Navigate to /index or /notes'));

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})

const readFile = utility.promisify(fs.readFile)

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
  });