const apiKlaidos = require("./apiKlaidos");
require('dotenv/config');

function apiKlaidosHandler(err, req, res, next){
    //console.error(err);
    if(err instanceof apiKlaidos){
        res.status(err.kodas).json({klaida: err.kodas, pranesimas: err.pranesimas});
        return;
    }
    res.status(500).json({klaida: "500", pranesimas: "Nežinoma klaida iš API serverio pusės"});
}

module.exports = apiKlaidosHandler;