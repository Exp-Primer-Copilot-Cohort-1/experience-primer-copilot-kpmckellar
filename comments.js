// Create web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set port
app.set('port', process.env.PORT || 3000);

// Set path to static files
app.use(express.static(path.join(__dirname, 'public')));

// Method for get all comments
app.get('/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

// Method for create new comment
app.post('/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const comments = JSON.parse(data);
            const newComment = {
                id: comments.length + 1,