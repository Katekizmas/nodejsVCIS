const klientas = require("../konfiguracijos/serveris.konfiguracija");

module.exports = {
  /*gautiGyvunus: async function(){
        const uzklausa = await klientas.query("SELECT vardas, pavadinimas AS rusis, gimimometai::TIMESTAMP::DATE, veisle, lytis, COALESCE(cipas, 'NĖRA') AS cipas, id_gyvunas, fk_rusis, fk_seimininkas  FROM Gyvunas INNER JOIN Rusis ON Gyvunas.fk_rusis = Rusis.id_rusis;");
        return uzklausa.rows;
    },*/
  gautiVartotojoVizitus: async function (id) {
    const uzklausa = await klientas.query(
      "SELECT Seimininkas.vardas, Seimininkas.pavarde, Seimininkas.telnr, Specialistas.pareigos, " +
        "Vizitas.diena, Vizitas.pradzia, Vizitas.pabaiga, Vizitas.busena, Vizitas.pastabos, Vizitas.id_vizitas, " +
        "COALESCE(Paslauga.pavadinimas, 'Paslauga ištrinta') AS pavadinimas, Gyvunas.vardas AS gyvunas " +
        "FROM Vizitas " +
        "LEFT JOIN Specialistas ON Vizitas.fk_specialistas = Specialistas.id_specialistas " +
        "LEFT JOIN Seimininkas ON Specialistas.fk_seimininkas = Seimininkas.id_seimininkas " +
        "LEFT OUTER JOIN Paslauga ON Vizitas.fk_paslauga = Paslauga.id_paslauga " +
        "INNER JOIN Gyvunas ON Vizitas.fk_gyvunas = Gyvunas.id_gyvunas " +
        "WHERE Vizitas.fk_seimininkas = $1 " +
        "ORDER BY Vizitas.diena DESC, Vizitas.pradzia ASC;",
      [id]
    );
    return uzklausa.rows;
  }, ///////////////////////////////////
  gautiNepatvirtintusVizitus: async function (id) {
    const uzklausa = await klientas.query(
      "SELECT DISTINCT Seimininkas.vardas, Seimininkas.pavarde, Seimininkas.telnr, Seimininkas.pastas, " +
        "Vizitas.id_vizitas, Vizitas.diena AS vizitasdiena, Vizitas.pradzia AS vizitaspradzia, " +
        "Vizitas.pabaiga AS vizitaspabaiga, Vizitas.busena AS vizitasbusena, Vizitas.pastabos AS vizitaspastabos, " +
        "COALESCE(Paslauga.pavadinimas, 'Paslauga ištrinta') AS paslaugapavadinimas, " +
        "Gyvunas.vardas AS gyvunasvardas, Gyvunas.cipas AS gyvunascipas " +
        "FROM Vizitas " +
        "INNER JOIN Seimininkas ON Vizitas.fk_seimininkas = Seimininkas.id_seimininkas " +
        "INNER JOIN Gyvunas ON Vizitas.fk_gyvunas = Gyvunas.id_gyvunas " +
        "LEFT OUTER JOIN Paslauga ON Vizitas.fk_paslauga = Paslauga.id_paslauga " +
        "INNER JOIN Specialistas_Paslauga ON Specialistas_Paslauga.fk_specialistas = $1 AND Specialistas_Paslauga.fk_paslauga = Vizitas.fk_paslauga " +
        "WHERE Vizitas.busena = 'Nepatvirtintas' " +
        "ORDER BY Vizitas.diena DESC, Vizitas.pradzia ASC;",
      [id]
    );
    return uzklausa.rows;
  },
  gautiPatvirtintusVizitus: async function (id) {
    const uzklausa = await klientas.query(
      "SELECT Seimininkas.vardas, Seimininkas.pavarde, Seimininkas.telnr, " +
        "Vizitas.id_vizitas, Vizitas.diena, Vizitas.diena AS vizitasdiena, Vizitas.pradzia AS vizitaspradzia, Vizitas.pabaiga AS vizitaspabaiga, " +
        "Vizitas.busena AS vizitasbusena, Vizitas.pastabos AS vizitaspastabos, " +
        "COALESCE(Paslauga.pavadinimas, 'Paslauga ištrinta') AS paslaugapavadinimas, " +
        "Gyvunas.vardas AS gyvunasvardas, Gyvunas.cipas AS gyvunascipas, " +
        "Skiepas.pavadinimas AS skiepaspavadinimas, " +
        "Istorija.svoris AS istorijasvoris, Istorija.savijauta AS istorijasavijauta, Istorija.nustatyta AS istorijanustatyta, " +
        "Istorija.komentarai AS istorijakomentarai, Istorija.paskirtasgydymas AS istorijapaskirtasgydymas " +
        "FROM Vizitas " +
        "INNER JOIN Seimininkas ON Vizitas.fk_seimininkas = Seimininkas.id_seimininkas " +
        "INNER JOIN Gyvunas ON Vizitas.fk_gyvunas = Gyvunas.id_gyvunas " +
        "LEFT OUTER JOIN Paslauga ON Vizitas.fk_paslauga = Paslauga.id_paslauga " +
        "LEFT JOIN Istorija ON Vizitas.id_vizitas = Istorija.fk_vizitas " +
        "LEFT JOIN Skiepas ON Vizitas.id_vizitas = Skiepas.fk_vizitas " +
        "WHERE (Vizitas.busena = 'Patvirtintas' OR Vizitas.busena = 'Atliktas') AND Vizitas.fk_specialistas = $1;",
      [id]
    );
    return uzklausa.rows;
  },
  gautiVykdomuVizituSkaiciu: async function (id) {
    const uzklausa = await klientas.query(
      "SELECT COUNT(busena) as skaicius FROM Vizitas WHERE busena = 'Nepatvirtintas' AND fk_seimininkas = $1;",
      [id]
    );
    return uzklausa.rows;
  },
  sukurtiVizitasIstorija: async function (objektas) {
    const uzklausa = await klientas.query(
      "INSERT INTO Istorija (svoris, savijauta, nustatyta, komentarai, paskirtasgydymas, laikas, fk_vizitas) VALUES($1, $2, $3, $4, $5, to_char(NOW(), 'YYYY-MM-DD HH24:MI'), $6);",
      [
        objektas.svoris,
        objektas.savijauta,
        objektas.nustatyta,
        objektas.komentarai,
        objektas.paskirtasgydymas,
        objektas.id_vizitas,
      ]
    ); // cia idemiau paziuret del roles query
    return uzklausa.rows;
  },
  sukurtiVizitasSkiepas: async function (objektas) {
    const uzklausa = await klientas.query(
      "INSERT INTO Skiepas (pavadinimas, laikas, fk_vizitas) VALUES($1, to_char(NOW(), 'YYYY-MM-DD HH24:MI'), $2);",
      [objektas.pavadinimas, objektas.id_vizitas]
    );
    return uzklausa.rows;
  },
  sukurtiVizita: async function (objektas, id) {
    const uzklausa = await klientas.query(
      "INSERT INTO Vizitas (diena, pradzia, pabaiga, pastabos, busena, fk_paslauga, fk_gyvunas, fk_seimininkas) VALUES($1, $2, to_char((to_timestamp($3, 'HH24:MI') + interval '1 hour')::timestamp, 'HH24:MI'), $4, $5, $6, $7, $8);",
      [
        objektas.data,
        objektas.laikas,
        objektas.laikas,
        objektas.aprasymas,
        "Nepatvirtintas",
        objektas.paslauga,
        objektas.gyvunas,
        id,
      ]
    );
    return uzklausa.rows;
  },
  ivykdytiVizita: async function (objektas) {
    const uzklausa = await klientas.query(
      "UPDATE Vizitas SET Busena = 'Atliktas' WHERE id_vizitas = $1; ",
      [objektas.id_vizitas]
    );
    return uzklausa.rows;
  },
  patvirtintiVizita: async function (vizitas, specialistas) {
    const uzklausa = await klientas.query(
      "UPDATE Vizitas SET Busena = 'Patvirtintas', fk_specialistas = $1, diena = $2, pradzia = $3, pabaiga = to_char((to_timestamp($4, 'HH24:MI') + interval '1 hour')::timestamp, 'HH24:MI'), pastabos = $5 WHERE id_vizitas = $6;",
      [
        specialistas,
        vizitas.vizitasdiena,
        vizitas.vizitaspradzia,
        vizitas.vizitaspradzia,
        vizitas.vizitaspastabos,
        vizitas.id_vizitas,
      ]
    );
    return uzklausa.rows;
  },
  atsauktiVizitaSpecialistas: async function (vizitas, specialistas) {
    const uzklausa = await klientas.query(
      "UPDATE Vizitas SET Busena = 'Atšauktas', fk_specialistas = $1, diena = $2, pradzia = $3, pabaiga = to_char((to_timestamp($4, 'HH24:MI') + interval '1 hour')::timestamp, 'HH24:MI'), pastabos = $5 WHERE id_vizitas = $6;",
      [
        specialistas,
        vizitas.vizitasdiena,
        vizitas.vizitaspradzia,
        vizitas.vizitaspradzia,
        vizitas.vizitaspastabos,
        vizitas.id_vizitas,
      ]
    );
    return uzklausa.rows;
  },
  atsauktiVizita: async function (vizitas, seimininkas) {
    const uzklausa = await klientas.query(
      "UPDATE Vizitas SET Busena = 'Atšauktas' WHERE id_vizitas = $1 AND fk_seimininkas = $2;",
      [vizitas, seimininkas]
    );
    return uzklausa.rows;
  },
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
