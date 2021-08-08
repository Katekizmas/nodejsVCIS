const klientas = require("../konfiguracijos/serveris.konfiguracija");

module.exports = {
  gautiSeimininkoGyvunoIstorija: async function (id) {
    const uzklausa = await klientas.query(
      "SELECT laikas, svoris, savijauta, nustatyta, komentarai, paskirtasgydymas" +
        " FROM Vizitas INNER JOIN Istorija ON Vizitas.id_vizitas = Istorija.fk_vizitas" +
        " WHERE fk_gyvunas = $1 ORDER BY laikas DESC;",
      [id]
    );
    return uzklausa.rows;
  },
  /*sukurtiGyvunoIstorija: async function (objektas, id) {
    const uzklausa = await klientas.query(
      "INSERT INTO Istorija (svoris, savijauta, nustatyta, komentarai, paskirtasgydymas, laikas, fk_gyvunas, fk_vizitas)"
  + " VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_istorija;",
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
  },*/
  /*redaguotiGyvuna: async function(objektas, id){
        const uzklausa = await klientas.query("UPDATE Gyvunas SET vardas = $1, gimimometai = $2, veisle = $3, lytis = $4, cipas = $5, fk_rusis = $6  WHERE id_gyvunas = $7 AND fk_seimininkas = $8;",
        [objektas.vardas, objektas.gimimometai, objektas.veisle, objektas.lytis, objektas.cipas, objektas.fk_rusis, objektas.id_gyvunas, id]); // cia idemiau paziuret del roles query
        return uzklausa.rows;
    },
    istrintiGyvuna: async function(gyvunas, id){
        const uzklausa = await klientas.query("DELETE FROM Gyvunas WHERE id_gyvunas = $1 AND fk_seimininkas = $2;",
        [gyvunas, id]);
        return uzklausa.rows;
    },*/
};
