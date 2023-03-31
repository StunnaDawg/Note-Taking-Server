const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('../public'));

app.get('/', (req, res) => res.send('Navigate to /index or /notes'));

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes'))
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})