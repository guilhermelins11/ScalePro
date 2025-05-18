const Item = require('../models/modelItem');

exports.getItens = (req, res) => {
    Item.listarItens((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};