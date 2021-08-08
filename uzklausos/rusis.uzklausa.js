const klientas = require("../konfiguracijos/serveris.konfiguracija");

module.exports = {
    gautiRusis: async function(){
        const uzklausa = await klientas.query("SELECT * FROM Rusis;");
        return uzklausa.rows;
    },
    sukurtiRusi: async function(objektas){
        const uzklausa = await klientas.query("INSERT INTO Rusis (pavadinimas) VALUES($1) RETURNING id_rusis;",
        [objektas.pavadinimas]); // cia idemiau paziuret del roles query
        return uzklausa.rows;
    },
    redaguotiRusi: async function(objektas){
        const uzklausa = await klientas.query("UPDATE Rusis SET pavadinimas = $1 WHERE id_rusis = $2;",
        [objektas.pavadinimas, objektas.id_rusis]); // cia idemiau paziuret del roles query
        return uzklausa.rows;
    },
    istrintiRusi: async function(id_rusis){
        const uzklausa = await klientas.query("DELETE FROM Rusis WHERE id_rusis = $1;",
        [id_rusis]);
        return uzklausa.rows;
    },
}