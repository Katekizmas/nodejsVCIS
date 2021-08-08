const express = require('express');
const router = express.Router();

const uzklausaSkiepas = require("../uzklausos/skiepas.uzklausa");
const auth = require("./sessionauth.modelis");
const apiKlaidos = require("../klaidos/apiKlaidos");

//Gauti visus gyvūno istoriją
router.get("/gyvunas/:id_gyvunas", auth.patikrintiCookie, async(req, res) => {
    const { id_gyvunas } = req.params;
    try{
        uzklausaSkiepas.gautiGyvunoSkiepus(id_gyvunas).then(skiepas => {
            res.json({
                skiepas
            });
        });
    }catch(klaida){
        res.status(404).json({ pranesimas : klaida });
    }
});

module.exports = router;