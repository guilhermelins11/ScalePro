const db = require('../config/dbCadMei');

exports.listarCadastros = (callback) => {
    db.query( 'SELECT * FROM cadastro', callback);
};