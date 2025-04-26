const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const userRoutes = require('../back/routes/userRoutes.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '..', 'front', 'pages')));
app.use('/images', express.static(path.resolve(__dirname, '..', 'images')));

console.log('Caminho da index:', path.join(__dirname, '..', 'front', 'pages', 'index.html'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'front', 'pages', 'index.html'));
});

app.use('/api', userRoutes);

module.exports = app;
