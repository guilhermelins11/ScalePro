const { Pool } = require('pg');

const dbCadMei = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123456',
    database: 'cadastro_mei',
    port: 5432
});

dbCadMei.connect((err, client, release) => {
    if (err) {
        console.error('Erro ao Conectar ao PostgreSQL:', err)
    } else {
        console.log('Conectado ao PostgreSQL!');
        if (release) release();
    }
});

module.exports = dbCadMei;