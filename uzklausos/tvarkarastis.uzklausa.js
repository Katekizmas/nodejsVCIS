const klientas = require("../konfiguracijos/serveris.konfiguracija");

module.exports = {
    gautiTvarkarascius: async function(id){
        const uzklausa = await klientas.query("SELECT * FROM tvarkarastis WHERE vartotojas_fkey = $1;",
        [id]);
        return uzklausa.rows;
    },
}