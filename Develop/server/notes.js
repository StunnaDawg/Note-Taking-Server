const notes = require('express').Router()
const { readFromFile, writeToFile, readAndAppend } = require('../helper/fsutilities');
const { v4: uuidv4 } = require('uuid');

// Get request to receive notes
notes.get('/', (req, res) => {
    console.info(`${req.method} recieved for the stored notes`)
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
})

// post to the notes
// makes sure title and text are present and generates a unique ID that is used for a DELETE request
notes.post('/', (req, res) => {
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

// Unfinished Delete request
// reads from note file and looks for entered id 
/* notes.delete('/:id', (req, res) => {
    const id = JSON.stringify(req.params.id);
    let noteFile = readFromFile('../db/db.json')
    if (req.body && req.params.id) {
    console.info(`${req.method} request received for notes id ${req.params.id}`);
    
    let index = -1;
    for (let i = 0; i < noteFile.length; i++) {
      if (noteFile[i].id === id) {
        index = i;
      }
    }
    if (noteFile[id]) {
        console.info(noteFile[id])
        delete noteFile[id];
        writeToFile('../db/db.json', notes);
        res.sendStatus(204);
      } else {
        res.status(404).send('Note not found');
      }

    }}); */
module.exports = notes;