const klientas = require("../konfiguracijos/serveris.konfiguracija");

module.exports = {
  gautiSpecialistus: async function () {
    const uzklausa = await klientas.query(
      "SELECT vardas, pavarde, telnr, pastas, pareigos, darbolaikasnuo, darbolaikasiki, pastabos, id_specialistas FROM Specialistas " +
        "INNER JOIN Seimininkas ON Specialistas.fk_seimininkas = Seimininkas.id_seimininkas;"
    );
    return uzklausa.rows;
  },
  gautiNedirbanciusSeimininkus: async function () {
    const uzklausa = await klientas.query(
      "SELECT vardas, pavarde, pastas, id_seimininkas AS darbuotojas, telnr FROM Seimininkas " +
        "LEFT JOIN Specialistas ON Seimininkas.id_seimininkas = Specialistas.fk_seimininkas " +
        "WHERE Specialistas.fk_seimininkas IS NULL;"
    );
    return uzklausa.rows;
  },
  sukurtiSpecialista: async function (objektas) {
    const uzklausa = await klientas.query(
      "INSERT INTO Specialistas (pareigos, darbolaikasnuo, darbolaikasiki, pastabos, role, fk_seimininkas) " +
        "VALUES($1, $2, $3, $4, $5, $6) RETURNING id_specialistas;",
      [
        objektas.pareigos,
        objektas.darbolaikasnuo,
        objektas.darbolaikasiki,
        objektas.pastabos,
        "MODERATOR",
        objektas.darbuotojas,
      ]
    ); // cia idemiau paziuret del roles query
    return uzklausa.rows;
  },
  redaguotiSpecialista: async function (objektas) {
    const uzklausa = await klientas.query(
      "UPDATE Specialistas SET pareigos = $1, darbolaikasnuo = $2, darbolaikasiki = $3, pastabos = $4 WHERE id_specialistas = $5;",
      [
        objektas.pareigos,
        objektas.darbolaikasnuo,
        objektas.darbolaikasiki,
        objektas.pastabos,
        objektas.id_specialistas,
      ]
    ); // cia idemiau paziuret del roles query
    return uzklausa.rows;
  },
  istrintiSpecialista: async function (id_specialistas) {
    const uzklausa = await klientas.query(
      "DELETE FROM Specialistas WHERE id_specialistas = $1;",
      [id_specialistas]
    );
    return uzklausa.rows;
  },
};
