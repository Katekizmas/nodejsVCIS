const express = require('express');
const router = express.Router();

const uzklausaIstorija = require("../uzklausos/istorija.uzklausa");
const auth = require("./sessionauth.modelis");
const apiKlaidos = require("../klaidos/apiKlaidos");

//Gauti visus gyvūno istoriją
router.get("/gyvunas/:id_gyvunas", auth.patikrintiCookie, async(req, res) => {
    const { id_gyvunas } = req.params;
    try{
        uzklausaIstorija.gautiSeimininkoGyvunoIstorija(id_gyvunas).then(istorija => {
            res.json({
                istorija
            });
        });
    }catch(klaida){
        res.status(404).json({ pranesimas : klaida });
    }
});

module.exports = router;