const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const routesCad = require('./Routes/routesCad');
const routesItem = require('./Routes/routesItem');
const routesServ = require('./Routes/routesServ');
const routesLogin = require('./Routes/routesLogin');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static(path.resolve(__dirname, '..', 'Pages')));
app.use('/images', express.static(path.resolve(__dirname, '..', 'images')));
app.use('/Style', express.static(path.resolve(__dirname,'..', 'Style')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'Pages', 'index.html'));
});


app.use('/cadastro_mei', routesCad);
app.use('/login', routesLogin);

app.use('/produtos', routesItem);
app.use('/servicos', routesServ);

app.use((req, res) => {
    res.status(404).send('Pagina não encontrada');
});

module.exports = app;