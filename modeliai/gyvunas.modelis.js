const express = require("express");
const router = express.Router();

const uzklausaGyvunas = require("../uzklausos/gyvunas.uzklausa");
const auth = require("./sessionauth.modelis");
const apiKlaidos = require("../klaidos/apiKlaidos");

//Gauti visus gyvūnus
router.get("/", auth.patikrintiCookie, async (req, res) => {
  try {
    uzklausaGyvunas.gautiGyvunus().then((gyvunas) => {
      res.json({
        gyvunas,
      });
    });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});
//Gauti vartotojo gyvūnus
router.get("/vartotojo", auth.patikrintiCookie, async (req, res) => {
  const { id_seimininkas } = req.SESIJOS_ID; // fk_seimininkas
  try {
    uzklausaGyvunas.gautiVartotojoGyvunus(id_seimininkas).then((gyvunas) => {
      res.status(200).json({
        gyvunas,
      });
    });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

//Sukurti naują gyvūną
router.post("/", auth.patikrintiCookie, async (req, res) => {
  try {
    const { id_seimininkas } = req.SESIJOS_ID;
    uzklausaGyvunas
      .sukurtiGyvuna(req.body, id_seimininkas)
      .then((atsakymas) => {
        res.status(200).json({
          id_gyvunas: atsakymas[0].id_gyvunas,
          pranesimas: "Sėkmingai pridėta",
        });
      });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

//Redaguoti gyvūną
router.put("/", auth.patikrintiCookie, async (req, res) => {
  try {
    const { id_seimininkas } = req.SESIJOS_ID;
    //const { gaunamasID } = req.params;
    //const { pavadinimas } = req.body;
    uzklausaGyvunas.redaguotiGyvuna(req.body, id_seimininkas);
    res.status(200).json({ pranesimas: "Sėkmingai atnaujinta" });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

//Ištrinti gyvūną
router.delete("/:gaunamasID", auth.patikrintiCookie, async (req, res) => {
  try {
    const { gaunamasID } = req.params;
    const { id_seimininkas } = req.SESIJOS_ID;
    uzklausaGyvunas.istrintiGyvuna(gaunamasID, id_seimininkas);
    res.status(200).json({ pranesimas: "Sėkmingai ištrinta" });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

module.exports = router;
