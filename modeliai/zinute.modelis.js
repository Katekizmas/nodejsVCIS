const express = require("express");
const router = express.Router();

const uzklausaZinute = require("../uzklausos/zinute.usklausa");
const auth = require("./sessionauth.modelis");
const apiKlaidos = require("../klaidos/apiKlaidos");

//Specialistas
router.get("/dalyviai-specialisto", auth.patikrintiCookie, async (req, res) => {
  const { id_specialistas } = req.SESIJOS_ID;
  try {
    uzklausaZinute
      .gautiSpecialistoDalyvius(id_specialistas)
      .then((dalyviai) => {
        res.json({
          dalyviai,
        });
      });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});
router.get(
  "/dalyvio-zinutes/:gaunamasID",
  auth.patikrintiCookie,
  async (req, res) => {
    const { gaunamasID } = req.params;
    try {
      uzklausaZinute.gautiDalyviuZinutes(gaunamasID).then((zinutes) => {
        res.json({
          zinutes,
        });
      });
    } catch (klaida) {
      res.status(404).json({ pranesimas: klaida });
    }
  }
);

router.post(
  "/issiusti-zinute-seimininkui",
  auth.patikrintiCookie,
  async (req, res) => {
    //const { id_specialistas } = req.SESIJOS_ID;
    const { id_seimininkas } = req.SESIJOS_ID;
    try {
      uzklausaZinute
        .isaugotiZinute(/*id_specialistas*/ id_seimininkas, req.body)
        .then((atsakymas) => {
          res.status(200).json({
            zinute: atsakymas[0],
          });
        });
    } catch (klaida) {
      res.status(404).json({ pranesimas: klaida });
    }
  }
);
//Seimininkas
router.get("/dalyviai-seimininko", auth.patikrintiCookie, async (req, res) => {
  const { id_seimininkas } = req.SESIJOS_ID;
  try {
    uzklausaZinute.gautiSeimininkoDalyvius(id_seimininkas).then((dalyviai) => {
      res.json({
        dalyviai,
      });
    });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

router.post(
  "/issiusti-zinute-specialistui",
  auth.patikrintiCookie,
  async (req, res) => {
    const { id_seimininkas } = req.SESIJOS_ID;
    try {
      uzklausaZinute
        .isaugotiZinute(id_seimininkas, req.body)
        .then((atsakymas) => {
          res.status(200).json({
            zinute: atsakymas[0],
          });
        });
    } catch (klaida) {
      res.status(404).json({ pranesimas: klaida });
    }
  }
);
module.exports = router;
