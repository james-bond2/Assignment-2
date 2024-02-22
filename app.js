const http = require('http');
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const app = express();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Define routes within the Express app
app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>This is Home Page</h1>');
    res.end();
});

app.get('/about', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>This is About Page</h1>');
    res.end();
});

app.get('/contact', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>This is Contact Page</h1>');
    res.end();
});

app.post('/file-upload', upload.single('file'), (req, res) => {
    if (req.file) {
        console.log('File uploaded successfully.');
        res.send('File uploaded successfully.');
    } else {
        console.error('Error uploading file.');
        res.status(500).send('File Upload Error');
    }
});

app.get('/file-write', (req, res) => {
    fs.writeFile('demo.txt', 'hello world', (error) => {
        if (error) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h2>File successfully uploaded!</h2>');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h2>File was not uploaded!</h2>');
        }
        res.end();
    });
});

const server = http.createServer(app);

server.listen(5500);
console.log('HTTP Server Connected Successfully!');
