const express = require("express");
const router = express.Router();

const uzklausaPaslauga = require("../uzklausos/paslauga.uzklausa");
const auth = require("./sessionauth.modelis");
const apiKlaidos = require("../klaidos/apiKlaidos");

//Gauti visas paslaugas
router.get("/", auth.patikrintiCookie, async (req, res) => {
  try {
    uzklausaPaslauga.gautiPaslaugas().then((paslauga) => {
      res.json({
        paslauga,
      });
    });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

//Sukurti naują rušį
router.post("/", auth.patikrintiCookie, async (req, res) => {
  try {
    /*uzklausaPaslauga.sukurtiPaslauga(req.body);
        res.status(200).json({ pranesimas : "Sėkmingai pridėta" });*/
    uzklausaPaslauga.sukurtiPaslauga(req.body).then((atsakymas) => {
      res.status(200).json({
        id_paslauga: atsakymas[0].id_paslauga,
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
    uzklausaPaslauga.redaguotiPaslauga(req.body);
    res.status(200).json({ pranesimas: "Sėkmingai atnaujinta" });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

//Ištrinti rūšį
router.delete("/:gaunamasID", async (req, res) => {
  try {
    const { gaunamasID } = req.params;
    uzklausaPaslauga.istrintiPaslauga(gaunamasID);
    res.status(200).json({ pranesimas: "Sėkmingai ištrinta" });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

/////////////////////////////////////////////
//Gauti darbuotojo paslaugas
router.get(
  "/darbuotojo/:gaunamasID",
  auth.patikrintiCookie,
  async (req, res) => {
    //admin
    const { gaunamasID } = req.params;
    try {
      uzklausaPaslauga.gautiDarbuotojoPaslaugas(gaunamasID).then((paslauga) => {
        res.json({
          paslauga,
        });
      });
    } catch (klaida) {
      res.status(404).json({ pranesimas: klaida });
    }
  }
);

//Prideti naujas paslaugas darbuotojui
router.post(
  "/darbuotojo/prideti/:gaunamasID",
  auth.patikrintiCookie,
  async (req, res) => {
    try {
      const { gaunamasID } = req.params;
      uzklausaPaslauga
        .sukurtiDarbuotojoPaslaugas(req.body, gaunamasID)
        .then((atsakymas) => {
          res.status(200).json({
            pranesimas: "Sėkmingai pridėta",
          });
        });
    } catch (klaida) {
      res.status(404).json({ pranesimas: klaida });
    }
  }
);

//Prideti naujas paslaugas darbuotojui
router.post(
  "/darbuotojo/istrinti/:gaunamasID",
  auth.patikrintiCookie,
  async (req, res) => {
    try {
      const { gaunamasID } = req.params;
      uzklausaPaslauga
        .istrintiDarbuotojoPaslaugas(req.body, gaunamasID)
        .then((atsakymas) => {
          res.status(200).json({
            pranesimas: "Sėkmingai ištrinta",
          });
        });
    } catch (klaida) {
      res.status(404).json({ pranesimas: klaida });
    }
  }
);

module.exports = router;
