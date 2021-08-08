const express = require('express');
const router = express.Router();

const uzklausaRusis = require("../uzklausos/rusis.uzklausa");
const auth = require("./sessionauth.modelis");
const apiKlaidos = require("../klaidos/apiKlaidos");

//Gauti visas rūšis
router.get("/", auth.patikrintiCookie, async(req, res) => {
    try{
        uzklausaRusis.gautiRusis().then(rusis => {
            res.json({
                rusis
            });
        });
    }catch(klaida){
        res.status(404).json({ pranesimas : klaida });
    }
});

//Sukurti naują rušį
router.post("/", auth.patikrintiCookie, async(req, res) => {
    try{ 
        uzklausaRusis.sukurtiRusi(req.body).then(atsakymas => {
            res.status(200).json({
                id_rusis: atsakymas[0].id_rusis,
                pranesimas: "Sėkmingai pridėta"
            });
        });
        /*
        uzklausaRusis.sukurtiRusi(req.body);
        res.status(200).json({ 
            id: atsakymas[0].id_seimininkas,
            pranesimas : "Sėkmingai pridėta" });*/
    }catch(klaida){
        res.status(404).json({ pranesimas : klaida });
    }
});

//Redaguoti rušį
router.put("/", auth.patikrintiCookie, async(req, res) => {
    try{
        uzklausaRusis.redaguotiRusi(req.body);
        res.status(200).json({ pranesimas : "Sėkmingai atnaujinta" });
    }catch(klaida){
        res.status(404).json({ pranesimas : klaida });
    }
});

//Ištrinti rūšį
router.delete("/:gaunamasID", async(req,res) => {
    try{
        const { gaunamasID } = req.params;
        uzklausaRusis.istrintiRusi(gaunamasID);
        res.status(200).json({ pranesimas : "Sėkmingai ištrinta" });
    }catch(klaida){
        res.status(404).json({ pranesimas : klaida });
    }
});

module.exports = router;