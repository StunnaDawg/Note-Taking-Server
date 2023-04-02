const express = require('express');
const path = require('path');
const api = require('./index')
const {readFromFile, writeToFile, readAndAppend} = require('../helper/fsutilities');
const { v4: uuidv4 } = require('uuid');
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


app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request complete`)
    console.log(`${req.body}`);

    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            notes_id: uuidv4(),
        }
    
    readAndAppend(newNote, '../db/db.json');
    res.json('Note recieved')
    } else {
        res.json('error error')
    }
})