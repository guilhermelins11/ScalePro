const db = require('../config/dbProd');

exports.listarItens = (callback) => {
    db.query('SELECT * FROM itens', callback);
};