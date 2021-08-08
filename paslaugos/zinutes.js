const nodeMailer = require("nodemailer");
const cron = require("node-cron");
require("dotenv/config");

const uzklausaPriminimasZinutes = require("../uzklausos/priminimuzinutes.uzklausa");
// Sinuciu siuntimas per pasta
var pastoTransporteris = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.PASTOPRISIJUNGIMAS,
    pass: process.env.PASTOSLAPTAZODIS,
  },
});

//cron.schedule("00 00 18 * * *", function () {
  cron.schedule("0 */5 * * * *", function () {
  uzklausaPriminimasZinutes.gautiSekanciosDienosVizitus().then((duomenys) => {
    for (const zinute of duomenys) {
      var pastoDuomenys = {
        from: "klinikaveterinarijos@gmail.com",
        to: zinute.pastas,
        subject: "Veterinarijos Klinikos vizitos priminimas",
        text:
          "Sveiki, primename, kad Jums rytoj (" +
          zinute.diena +
          ") nuo " +
          zinute.pradzia +
          " iki " +
          zinute.pabaiga +
          " valandos yra paskirtas vizitas pas " +
          zinute.vardas +
          " " +
          zinute.pavarde +
          " specialistą, jeigu turite kokių klausimų skambinkite telefonu į " +
          zinute.telnr +
          " arba rašykite žinutę per veterinarijos klinikos sistemą.",
      };
      pastoTransporteris.sendMail(pastoDuomenys);
    }
  });
});
