const express = require('express');
const app = express();

const { addFile, getFile, deleteFile, renameFile, readFile, writeInFile, editFile, deleteData } = require('./functions.js');

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/data', (req, res) => {
    res.send(getFile());
});

app.get('/add', (req, res) => {
    res.send(addFile(req.body.nama));
});

app.get('/delete', (req, res) => {
    res.send(deleteFile(req.body.nama));
});

app.get('/rename', (req, res) => {
    res.send(renameFile(req.body.nama, req.body.nama_baru));
});

app.get('/data/:nama', (req, res) => {
    res.send(readFile(req.params.nama));
});

app.get('/data/:nama/add', (req, res) => {
    res.send(writeInFile(req.params.nama, req.body));
});

app.get('/data/:nama/edit/:id', (req, res) => {
    res.send(editFile(req.params.nama, req.params.id, req.body));
});

app.get('/data/:nama/delete/:id', (req, res) => {
    res.send(deleteData(req.params.nama, req.params.id));
});

const port = 8000;
app.listen(port, () => console.log('http://localhost:' + port));