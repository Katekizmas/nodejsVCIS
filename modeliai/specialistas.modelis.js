const express = require("express");
const router = express.Router();

const uzklausaSpecialistas = require("../uzklausos/specialistas.uzklausa");
const auth = require("./sessionauth.modelis");
const apiKlaidos = require("../klaidos/apiKlaidos");

//Gauti visus specialistus
router.get("/", auth.patikrintiCookie, async (req, res) => {
  try {
    uzklausaSpecialistas.gautiSpecialistus().then((specialistas) => {
      res.json({
        specialistas,
      });
    });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

//Gauti nedirbancius seimininkus
router.get("/nedirbantys", auth.patikrintiCookie, async (req, res) => {
  try {
    uzklausaSpecialistas.gautiNedirbanciusSeimininkus().then((specialistas) => {
      res.json({
        specialistas,
      });
    });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

//Sukurti naują specialistą
router.post("/prideti", auth.patikrintiCookie, async (req, res) => {
  try {
    /*uzklausaSpecialistas.sukurtiPaslauga(req.body);
        res.status(200).json({ pranesimas : "Sėkmingai pridėta" });*/
    uzklausaSpecialistas.sukurtiSpecialista(req.body).then((atsakymas) => {
      res.status(200).json({
        id_specialistas: atsakymas[0].id_specialistas,
        pranesimas: "Sėkmingai pridėta",
      });
    });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

//Redaguoti rušį
router.put("/", auth.patikrintiCookie, async (req, res) => {
  try {
    uzklausaSpecialistas.redaguotiSpecialista(req.body);
    res.status(200).json({ pranesimas: "Sėkmingai atnaujinta" });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

//Ištrinti rūšį
router.delete("/:gaunamasID", async (req, res) => {
  try {
    const { gaunamasID } = req.params;
    uzklausaSpecialistas.istrintiSpecialista(gaunamasID);
    res.status(200).json({ pranesimas: "Sėkmingai ištrinta" });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

module.exports = router;
