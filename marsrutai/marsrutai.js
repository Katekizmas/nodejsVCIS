const modelisAutentifikacija = require("../modeliai/autentifikacija.modelis");
const modelisTvarkarastis = require("../modeliai/tvarkarastis.modelis");
const modelisRusis = require("../modeliai/rusis.modelis");
const modelisGyvunas = require("../modeliai/gyvunas.modelis");
const modelisIstorija = require("../modeliai/istorija.modelis");
const modelisSkiepas = require("../modeliai/skiepas.modelis");
const modelisVizitas = require("../modeliai/vizitas.modelis");
const modelisPaslauga = require("../modeliai/paslauga.modelis");
const modelisSpecialistas = require("../modeliai/specialistas.modelis");
const modelisZinute = require("../modeliai/zinute.modelis");

module.exports = function (programa) {
  programa.use("/autentifikacija", modelisAutentifikacija);
  programa.use("/tvarkarastis", modelisTvarkarastis);
  programa.use("/rusis", modelisRusis);
  programa.use("/gyvunas", modelisGyvunas);
  programa.use("/istorija", modelisIstorija);
  programa.use("/skiepas", modelisSkiepas);
  programa.use("/vizitas", modelisVizitas);
  programa.use("/paslauga", modelisPaslauga);
  programa.use("/specialistas", modelisSpecialistas);
  programa.use("/zinute", modelisZinute);
};
