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

app.get('/*', (req, res) => {
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
            id: uuidv4(),
        }
    
    readAndAppend(newNote, '../db/db.json');
    res.json('Note recieved')
    } else {
        res.json('error error')
    }
})


// find a specific note depending on the id
/* app.delete('/api/notes/:id', (req, res) => {
    if (req.body && req.params.id) {
        console.info(`${req.method} request received for notes id ${req.params.id}`);
        const id = req.params.id;
        readFromFile('../db/db.json')
        .then((notes) => {
          const index = notes.findIndex((note) => note.id == id);
            notes.splice(index, 1);
            return writeToFile('../db/db.json', notes);
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
  }}); */