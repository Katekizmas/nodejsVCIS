const express = require("express");
const router = express.Router();

const uzklausaVizitas = require("../uzklausos/vizitas.uzklausa");
const auth = require("./sessionauth.modelis");
const apiKlaidos = require("../klaidos/apiKlaidos");

//Gauti visus gyvūnus
router.get("/", auth.patikrintiCookie, async (req, res) => {
  try {
    uzklausaVizitas.gautiGyvunus().then((vizitas) => {
      res.json({
        vizitas,
      });
    });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});
//Gauti vartotojo vizitus
router.get("/vartotojo", auth.patikrintiCookie, async (req, res) => {
  const { id_seimininkas } = req.SESIJOS_ID; // fk_seimininkas
  try {
    uzklausaVizitas.gautiVartotojoVizitus(id_seimininkas).then((vizitas) => {
      res.status(200).json({
        vizitas,
      });
    });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

//Gauti vartotojo vizitus
router.get("/vykdomi-vizitai", auth.patikrintiCookie, async (req, res) => {
  const { id_seimininkas } = req.SESIJOS_ID; // fk_seimininkas
  try {
    uzklausaVizitas
      .gautiVykdomuVizituSkaiciu(id_seimininkas)
      .then((vizitas) => {
        res.status(200).json({
          vizitas,
        });
      });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});

//Gauti nepatvirtintus seimininku vizitus
router.get(
  "/vizitai-nepatvirtinti",
  auth.patikrintiCookie,
  async (req, res) => {
    const { id_specialistas } = req.SESIJOS_ID; // fk_seimininkas
    try {
      uzklausaVizitas
        .gautiNepatvirtintusVizitus(id_specialistas)
        .then((vizitas) => {
          res.status(200).json({
            vizitas,
          });
        });
    } catch (klaida) {
      res.status(404).json({ pranesimas: klaida });
    }
  }
);
//Gauti nepatvirtintus seimininku vizitus
router.get("/vizitai-patvirtinti", auth.patikrintiCookie, async (req, res) => {
  const { id_specialistas } = req.SESIJOS_ID; // fk_seimininkas
  try {
    uzklausaVizitas
      .gautiPatvirtintusVizitus(id_specialistas)
      .then((vizitas) => {
        res.status(200).json({
          vizitas,
        });
      });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});
//Sukurti naują vizitą
router.post("/sukurti", auth.patikrintiCookie, async (req, res) => {
  try {
    const { id_seimininkas } = req.SESIJOS_ID;
    uzklausaVizitas
      .sukurtiVizita(req.body, id_seimininkas)
      .then((atsakymas) => {
        res.status(200).json({
          pranesimas: "Sėkmingai pridėta",
        });
      });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});
//patvirtinti vizitą
router.post(
  "/ivykdyti-specialistas-istorija",
  auth.patikrintiCookie,
  ivykdytiVizita,
  async (req, res) => {
    try {
      uzklausaVizitas.sukurtiVizitasIstorija(req.body).then((atsakymas) => {
        res.status(200).json({
          pranesimas: "Sėkmingai įvykdyta, istorija išsaugota",
        });
      });
    } catch (klaida) {
      res.status(404).json({ pranesimas: klaida });
    }
  }
);
router.post(
  "/ivykdyti-specialistas-skiepas",
  auth.patikrintiCookie,
  ivykdytiVizita,
  async (req, res) => {
    try {
      uzklausaVizitas.sukurtiVizitasSkiepas(req.body).then((atsakymas) => {
        res.status(200).json({
          pranesimas: "Sėkmingai įvykdyta, skiepas išsaugotas",
        });
      });
    } catch (klaida) {
      res.status(404).json({ pranesimas: klaida });
    }
  }
);
//patvirtinti vizitą
router.patch(
  "/patvirtinti-specialistas",
  auth.patikrintiCookie,
  async (req, res) => {
    try {
      const { id_specialistas } = req.SESIJOS_ID;
      uzklausaVizitas
        .patvirtintiVizita(req.body, id_specialistas)
        .then((atsakymas) => {
          res.status(200).json({
            pranesimas: "Sėkmingai patvirtinta",
          });
        });
    } catch (klaida) {
      res.status(404).json({ pranesimas: klaida });
    }
  }
);
//atšaukti vizitą
router.patch(
  "/atsaukti-specialistas",
  auth.patikrintiCookie,
  async (req, res) => {
    try {
      const { id_specialistas } = req.SESIJOS_ID;
      uzklausaVizitas
        .atsauktiVizitaSpecialistas(req.body, id_specialistas)
        .then((atsakymas) => {
          res.status(200).json({
            pranesimas: "Sėkmingai atšaukta",
          });
        });
    } catch (klaida) {
      res.status(404).json({ pranesimas: klaida });
    }
  }
);
//atšaukti vizitą
router.patch("/atsaukti", auth.patikrintiCookie, async (req, res) => {
  try {
    const { id_seimininkas } = req.SESIJOS_ID;
    const { vizitas } = req.body;
    uzklausaVizitas
      .atsauktiVizita(vizitas, id_seimininkas)
      .then((atsakymas) => {
        res.status(200).json({
          pranesimas: "Sėkmingai atšaukta",
        });
      });
  } catch (klaida) {
    res.status(404).json({ pranesimas: klaida });
  }
});
async function ivykdytiVizita(req, res, next) {
  uzklausaVizitas.ivykdytiVizita(req.body).then((sesija) => {
    next();
  });
  return;
}

module.exports = router;
