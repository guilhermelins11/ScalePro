const db = require('../config/dbProd');

exports.listarServicos = (callback) => {
    db.query('SELECT * FROM servicos', (err, result) => {
        if (err) return callback(err);
        const rows = result && result.rows ? result.rows : [];
        callback(null, rows);
    });
};
