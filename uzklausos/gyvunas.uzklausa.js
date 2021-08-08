const klientas = require("../konfiguracijos/serveris.konfiguracija");

module.exports = {
  gautiGyvunus: async function () {
    const uzklausa = await klientas.query(
      "SELECT vardas, pavadinimas AS rusis, gimimometai::TIMESTAMP::DATE, veisle, lytis, COALESCE(cipas, 'NĖRA') AS cipas, id_gyvunas, fk_rusis, fk_seimininkas  FROM Gyvunas LEFT JOIN Rusis ON Gyvunas.fk_rusis = Rusis.id_rusis;"
    );
    return uzklausa.rows;
  },
  gautiVartotojoGyvunus: async function (id) {
    const uzklausa = await klientas.query(
      "SELECT vardas, pavadinimas AS rusis, gimimometai::TIMESTAMP::DATE, veisle, lytis, COALESCE(cipas, 'NĖRA') AS cipas, id_gyvunas, fk_rusis, fk_seimininkas  FROM Gyvunas LEFT JOIN Rusis ON Gyvunas.fk_rusis = Rusis.id_rusis WHERE fk_seimininkas = $1 ORDER BY gimimometai DESC;",
      [id]
    );
    return uzklausa.rows;
  },
  sukurtiGyvuna: async function (objektas, id) {
    const uzklausa = await klientas.query(
      "INSERT INTO Gyvunas (vardas, gimimometai, veisle, lytis, cipas, fk_rusis, fk_seimininkas) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id_gyvunas;",
      [
        objektas.vardas,
        objektas.gimimometai,
        objektas.veisle,
        objektas.lytis,
        objektas.cipas,
        objektas.fk_rusis,
        id,
      ]
    ); // cia idemiau paziuret del roles query
    return uzklausa.rows;
  },
  redaguotiGyvuna: async function (objektas, id) {
    const uzklausa = await klientas.query(
      "UPDATE Gyvunas SET vardas = $1, gimimometai = $2, veisle = $3, lytis = $4, cipas = $5, fk_rusis = $6  WHERE id_gyvunas = $7 AND fk_seimininkas = $8;",
      [
        objektas.vardas,
        objektas.gimimometai,
        objektas.veisle,
        objektas.lytis,
        objektas.cipas,
        objektas.fk_rusis,
        objektas.id_gyvunas,
        id,
      ]
    ); // cia idemiau paziuret del roles query
    return uzklausa.rows;
  },
  istrintiGyvuna: async function (gyvunas, id) {
    const uzklausa = await klientas.query(
      "DELETE FROM Gyvunas WHERE id_gyvunas = $1 AND fk_seimininkas = $2;",
      [gyvunas, id]
    );
    return uzklausa.rows;
  },
  /*istrintiGyvuna: async function(gyvunas, id){
        const uzklausa = await klientas.query("DELETE FROM Gyvunas WHERE id_gyvunas = $1 AND fk_seimininkas = $2;",
        [gyvunas, id]);
        return uzklausa.rows;
    },*/
};
