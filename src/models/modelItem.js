const db = require('../config/dbProd');

exports.listarItens = (callback) => {
    db.query('SELECT * FROM itens', (err, result) => {
        if (err) return callback(err);
        const rows = result && result.rows ? result.rows : [];
        callback(null, rows);
    });
};
