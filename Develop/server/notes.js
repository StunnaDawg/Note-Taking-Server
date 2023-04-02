const notes = require('express').Router()
const { readFromFile, writeToFile, readAndAppend } = require('../helper/fsutilities');

notes.get('/', (req, res) => {
    console.info(`${req.method} recieved for the stored notes`)
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
})

notes.post('/', (req, res) => {
    console.info(`${req.method} request complete`)
    console.log(`${req.body}`);

    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text
        }
    
    readAndAppend(newNote, '../db/db.json');
    res.json('Note recieved')
    } else {
        res.error('error error')
    }
})

module.exports = notes;