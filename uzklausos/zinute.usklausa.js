const klientas = require("../konfiguracijos/serveris.konfiguracija");

module.exports = {
  gautiSpecialistoDalyvius: async function (id) {
    const uzklausa = await klientas.query(
      "SELECT DISTINCT ON (fk_seimininkas) vardas, pavarde, telnr, id_vizitas, Vizitas.fk_seimininkas, Specialistas.fk_seimininkas AS fk_specialistas FROM Vizitas " +
        "INNER JOIN Seimininkas ON Vizitas.fk_seimininkas = Seimininkas.id_seimininkas " +
        "INNER JOIN Specialistas ON Vizitas.fk_specialistas = Specialistas.id_specialistas " +
        "WHERE Vizitas.busena = 'Patvirtintas' AND Vizitas.fk_specialistas = $1;",
      [id]
    );
    return uzklausa.rows;
  },
  isaugotiZinute: async function (id, objektas) {
    const uzklausa = await klientas.query(
      "INSERT INTO Zinute (fk_vizitas, fk_siuntejas, fk_gavejas, zinute, laikas, busena) " +
        "VALUES ($1, $2, $3, $4, to_char(NOW(), 'YYYY-MM-DD HH24:MI'), 'Išsiųsta') " +
        "RETURNING fk_vizitas, fk_siuntejas, fk_gavejas, zinute, laikas",
      [objektas.fk_vizitas, id, objektas.fk_gavejas, objektas.zinute]
    );
    return uzklausa.rows;
  },
  gautiSeimininkoDalyvius: async function (id) {
    const uzklausa = await klientas.query(
      "SELECT DISTINCT ON (fk_specialistas) vardas, pavarde, telnr, id_vizitas, Vizitas.fk_seimininkas, id_seimininkas AS fk_specialistas FROM Vizitas " +
        "INNER JOIN Specialistas ON Vizitas.fk_specialistas = Specialistas.id_specialistas " +
        "INNER JOIN Seimininkas ON Specialistas.fk_seimininkas = Seimininkas.id_seimininkas " +
        "WHERE Vizitas.busena = 'Patvirtintas' AND Vizitas.fk_seimininkas = $1;",
      [id]
    );
    return uzklausa.rows;
  },
  gautiDalyviuZinutes: async function (id) {
    const uzklausa = await klientas.query(
      "SELECT * FROM Zinute WHERE fk_vizitas = $1;",
      [id]
    );
    return uzklausa.rows;
  },
  /*sukurtiGyvunoSkiepa: async function (objektas, id) {
    const uzklausa = await klientas.query(
      "INSERT INTO Skiepas (pavadinimas, laikas, fk_gyvunas, fk_vizitas) VALUES('Zeneca', '2020-02-02', 1, 1) RETURNING id_skiepas;",
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
