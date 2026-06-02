const { Pool } = require('pg');

const dbProd = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123456',
    database: 'produtos',
    port: 5432
});

dbProd.connect((err, client, release) => {
    if (err) {
        console.error('Erro ao Conectar ao PostgreSQL:', err)
    } else {
        console.log('Conectado ao PostgreSQL!');
        if (release) release();
    }
});

module.exports = dbProd;
