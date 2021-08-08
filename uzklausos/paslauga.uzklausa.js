const klientas = require("../konfiguracijos/serveris.konfiguracija");

module.exports = {
  gautiPaslaugas: async function () {
    const uzklausa = await klientas.query("SELECT * FROM Paslauga;");
    return uzklausa.rows;
  },
  sukurtiPaslauga: async function (objektas) {
    const uzklausa = await klientas.query(
      "INSERT INTO Paslauga (pavadinimas, aprasymas, kaina) VALUES($1, $2, $3) RETURNING id_paslauga;",
      [objektas.pavadinimas, objektas.aprasymas, objektas.kaina]
    ); // cia idemiau paziuret del roles query
    return uzklausa.rows;
  },
  redaguotiPaslauga: async function (objektas) {
    const uzklausa = await klientas.query(
      "UPDATE Paslauga SET pavadinimas = $1, aprasymas = $2, kaina = $3 WHERE id_paslauga = $4;",
      [
        objektas.pavadinimas,
        objektas.aprasymas,
        objektas.kaina,
        objektas.id_paslauga,
      ]
    ); // cia idemiau paziuret del roles query
    return uzklausa.rows;
  },
  istrintiPaslauga: async function (id_paslauga) {
    const uzklausa = await klientas.query(
      "DELETE FROM Paslauga WHERE id_paslauga = $1;",
      [id_paslauga]
    );
    return uzklausa.rows;
  },
  //////////////////////////////
  gautiDarbuotojoPaslaugas: async function (id_specialistas) {
    const uzklausa = await klientas.query(
      "SELECT id_paslauga, pavadinimas, " +
        "CASE WHEN fk_specialistas > 0 THEN true ELSE false END AS priklauso " +
        "FROM Paslauga " +
        "LEFT OUTER JOIN Specialistas_Paslauga ON Paslauga.id_paslauga = Specialistas_Paslauga.fk_paslauga " +
        "AND Specialistas_Paslauga.fk_specialistas = $1;",
      [id_specialistas]
    );
    return uzklausa.rows;
  },
  sukurtiDarbuotojoPaslaugas: async function (objektas, id) {
    var reiksmes = "";
    for (let i = 0; i < Object.keys(objektas).length; i++) {
      reiksmes += "(" + objektas[i].id_paslauga + ", " + id + ")";
      if (Object.keys(objektas).length - 1 != i) reiksmes += ", ";
      else reiksmes += ";";
    }
    const uzklausa = await klientas.query(
      "INSERT INTO Specialistas_Paslauga (fk_paslauga, fk_specialistas) VALUES " +
        reiksmes
    );
    return uzklausa.rows;
  },
  istrintiDarbuotojoPaslaugas: async function (objektas, id) {
    var reiksmes = "";
    for (let i = 0; i < Object.keys(objektas).length; i++) {
      reiksmes += objektas[i].id_paslauga;
      if (Object.keys(objektas).length - 1 != i) reiksmes += ", ";
    }
    const uzklausa = await klientas.query(
      "DELETE FROM Specialistas_Paslauga WHERE fk_paslauga IN (" +
        reiksmes +
        ") AND fk_specialistas = $1;",
      [id]
    );
    return uzklausa.rows;
  },
};
