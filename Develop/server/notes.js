const notes = require('express').Router()
const { readFromFile, writeToFile, readAndAppend } = require('../helper/fsutilities');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    console.info(`${req.method} recieved for the stored notes`)
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
})

notes.post('/', (req, res) => {
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

app.get('/:notes_id', (req, res) => {
    console.info(`${req.method} request received for notes id`);
    const {id} = req.params;
    readFromFile('../db/db.json')
    .then((data) => {
      const notes = JSON.parse(data);
      const note = notes.find((note) => note.id === id);

      if (note) {
        res.json(note);
      } else {
        res.status(404).send('Note not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Server error');
    });
  });

module.exports = notes;