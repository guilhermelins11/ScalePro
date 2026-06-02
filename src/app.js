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

const routesCad = require('./routes/routesCad');
const routesItem = require('./routes/routesItem');
const routesServ = require('./routes/routesServ');
const routesLogin = require('./routes/routesLogin');
const routesAuth = require('./routes/routesAuth');

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

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../images')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
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
