const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pgPool = require('./config/dbCadMei');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'replace_with_a_long_secret';

const routesCad = require('./Routes/routesCad');
const routesItem = require('./Routes/routesItem');
const routesServ = require('./Routes/routesServ');
const routesLogin = require('./Routes/routesLogin');
const routesAuth = require('./Routes/routesAuth');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

// Sessões (armazenadas no Postgres)
app.use(session({
    store: new PgSession({ pool: pgPool }),
    secret: process.env.SESSION_SECRET || 'replace_with_a_strong_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 dia
}));

// Protege o acesso à página /geral.html
app.use((req, res, next) => {
    if (req.path === '/geral.html') {
        // Verifica JWT no cookie ou no header Authorization
        const token = req.cookies && req.cookies.token ? req.cookies.token : (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        if (token) {
            try {
                const payload = jwt.verify(token, JWT_SECRET);
                req.user = payload;
                return next();
            } catch (e) {
                // token inválido
                console.error('JWT inválido:', e.message);
            }
        }
        // fallback: sessão em memória (se configurada)
        if (req.session && req.session.user) return next();
        return res.redirect('/entrar.html');
    }
    next();
});

app.use(express.static(path.resolve(__dirname, '..', 'Pages')));
app.use('/images', express.static(path.resolve(__dirname, '..', 'images')));
app.use('/Style', express.static(path.resolve(__dirname,'..', 'Style')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'Pages', 'index.html'));
});


app.use('/cadastro_mei', routesCad);
app.use('/login', routesLogin);
app.use('/auth', routesAuth);

app.use('/produtos', routesItem);
app.use('/servicos', routesServ);

app.use((req, res) => {
    res.status(404).send('Pagina não encontrada');
});

module.exports = app;