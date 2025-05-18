const db = require('../config/dbProd');

exports.listarServicos = (callback) => {
    db.query('SELECT * FROM servicos', callback);
};