const klientas = require("../konfiguracijos/serveris.konfiguracija");

module.exports = {
  gautiSekanciosDienosVizitus: async function () {
    const uzklausa = await klientas.query(
      "SELECT SPEC.vardas, SPEC.pavarde, SPEC.telnr, SEIM.pastas, diena, pradzia, pabaiga FROM Vizitas " +
        "INNER JOIN Specialistas ON Vizitas.fk_specialistas = Specialistas.id_specialistas " +
        "INNER JOIN Seimininkas AS SPEC ON Specialistas.id_specialistas = SPEC.id_seimininkas " +
        "INNER JOIN Seimininkas AS SEIM ON Vizitas.fk_seimininkas = SEIM.id_seimininkas " +
        "WHERE diena = to_char(NOW() + INTERVAL '1 DAY', 'YYYY-MM-DD') AND busena = 'Patvirtintas';"
    );
    return uzklausa.rows;
  },
};
