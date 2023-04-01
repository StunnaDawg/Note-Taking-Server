const fs = require('fs');
const util = require('util');

// promsify turns fs.readfile into a promise function so it will wait its turn
const readFromFile = util.promisify(fs.readFile);

// content is the content within the object that is to be written
// adding null means all values within the object will be stringified
// 4 is just for indentation
const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4) , (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`))
}

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    })
}

module.exports = { readFromFile, writeToFile, readAndAppend };