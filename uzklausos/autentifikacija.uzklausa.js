const klientas = require("../konfiguracijos/serveris.konfiguracija");

module.exports = {
  gautiVienaPagalPasta: async function (pastas) {
    const uzklausa = await klientas.query(
      "SELECT vardas, pavarde, pastas, telnr, slaptazodis, COALESCE(Specialistas.role, 'USER') as role, id_seimininkas, id_specialistas FROM seimininkas LEFT JOIN specialistas ON seimininkas.id_seimininkas = specialistas.fk_seimininkas WHERE seimininkas.pastas = $1 LIMIT 1;",
      [pastas]
    );
    return uzklausa.rows;
  },
  sukurtiVartotoja: async function (vartotojas) {
    const uzklausa = await klientas.query(
      "INSERT INTO seimininkas(vardas, pavarde, pastas, telnr, slaptazodis) VALUES($1, $2, $3, $4, $5) RETURNING id_seimininkas;",
      [
        vartotojas.vardas,
        vartotojas.pavarde,
        vartotojas.pastas,
        vartotojas.telnr,
        vartotojas.slaptazodis,
      ]
    );
    return uzklausa.rows;
  },
  gautiSesija: async function (SESIJOS_ID) {
    const uzklausa = await klientas.query(
      "SELECT * FROM autentifikacija WHERE id_autentifikacija = $1;",
      [SESIJOS_ID]
    );
    return uzklausa.rows;
  },
  /*atnaujintiSesija: async function(sesijosID, vartotojasPastas){
        const uzklausa = await klientas.query("UPDATE sesija SET id = $1, galiojimoLaikas = (CURRENT_TIMESTAMP + (7 ||' days')::interval) WHERE pastas = $2;",
        [sesijosID, vartotojasPastas]);
        return uzklausa.rows;
    },*/
  sukurtiSesija: async function (SESIJOS_ID, vartotojas) {
    const uzklausa = await klientas.query(
      "INSERT INTO autentifikacija (id_autentifikacija, fk_seimininkas, fk_specialistas, pastas, role, galiojimolaikas) VALUES($1, $2, $3, $4, $5, (CURRENT_TIMESTAMP + (7 ||' days')::interval));",
      [
        SESIJOS_ID,
        vartotojas.id_seimininkas,
        vartotojas.id_specialistas,
        vartotojas.pastas,
        vartotojas.role,
      ]
    ); // cia idemiau paziuret del roles query
    return uzklausa.rows;
  },
  istrintiSesija: async function (SESIJOS_ID) {
    const uzklausa = await klientas.query(
      "DELETE FROM autentifikacija WHERE id_autentifikacija = $1;",
      [SESIJOS_ID]
    );
    return uzklausa.rows;
  },
};
