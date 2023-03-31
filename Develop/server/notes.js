const notes = require('express').Router()
const { readFromFile, writeToFile, readAndAppend } = require('../helper/fsutilities');

notes.get('/', (req, res) => {
    console.info(`${req.method} recieved for the stored notes`)
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
})

module.exports = {notes};