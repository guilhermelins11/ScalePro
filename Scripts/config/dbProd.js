const mysql = require('mysql2');

const dbProd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'produtos'
});

dbProd.connect((err) => {
    if (err) {
        console.error('Erro ao Conectar ao MySQL:', err)
    } else {
        console.log('Conectado ao MySQL!')
    }
});

module.exports = dbProd;