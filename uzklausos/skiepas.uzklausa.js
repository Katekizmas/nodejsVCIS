const klientas = require("../konfiguracijos/serveris.konfiguracija");

module.exports = {
  gautiGyvunoSkiepus: async function (id) {
    const uzklausa = await klientas.query(
      "SELECT laikas, pavadinimas FROM Vizitas " +
        "INNER JOIN Skiepas ON Vizitas.id_vizitas = Skiepas.fk_vizitas " +
        "WHERE fk_gyvunas = $1 ORDER BY laikas DESC;",
      [id]
    );
    return uzklausa.rows;
  },
};
