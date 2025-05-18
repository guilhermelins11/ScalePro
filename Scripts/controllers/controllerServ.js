const Servico = require('../models/modelServ');

exports.getServicos = (req, res) => {
    Servico.listarServicos((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
    });
};