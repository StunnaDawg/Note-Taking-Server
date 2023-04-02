const notes = require('express').Router()
const { readFromFile, writeToFile, readAndAppend } = require('../helper/fsutilities');
const notesid = require('../helper/uuid');

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
            notes_id: notesid(),
        }
    
    readAndAppend(newNote, '../db/db.json');
    res.json('Note recieved')
    } else {
        res.json('error error')
    }
})

module.exports = notes;