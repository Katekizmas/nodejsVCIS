const crypto = require("crypto");
const apiKlaidos = require("../klaidos/apiKlaidos");
const uzklausaAutentifikacija = require("../uzklausos/autentifikacija.uzklausa");

var iskviesta = 1;
//Kiekviena karta siunčiam šitą, kai vartotojas bando gauti duomenis
async function patikrintiCookie(req, res, next) {
  const SESIJOS_ID = req.cookies.SESIJOS_ID;
  if (SESIJOS_ID) {
    //Jeigu SESIJOS_ID cookie yra header'į tikrinam duomenų bazėj
    console.log("Iškviesta užtikrinti sesija funkcija...(" + iskviesta++ + ")");
    uzklausaAutentifikacija.gautiSesija(SESIJOS_ID).then((sesija) => {
      if (sesija.length) {
        const duomenys = {
          id_seimininkas: sesija[0].fk_seimininkas,
          id_specialistas: sesija[0].fk_specialistas,
          pastas: sesija[0].pastas,
          role: sesija[0].role,
        };
        req.SESIJOS_ID = duomenys;
        next();
      } else {
        //next(apiKlaidos.blogasTokenas("Nerastas SESIJOS_ID cookie duomenų bazėje"));
        res.json({
          klaida: 403,
          role: "NOT FOUND",
        });
        return;
      }
    });
  } else {
    res.json({
      klaida: 403,
      role: "NOT FOUND",
    });
    //next(apiKlaidos.neautorizuotasVartotojas("Nerastas SESIJOS_ID cookie header'į"));
    return;
  }
}

//Siunčiam šitą kai vartotojas prisijungia
async function sukurtiCookie(saugomiDuomenys, res) {
  //Kiekviena karta vartotojui prisijungus, sukuriame naują SESIJOS_ID
  const SESIJOS_ID = crypto.randomBytes(64).toString("hex");
  sukurtiPuslapioCookie(SESIJOS_ID, res);
  uzklausaAutentifikacija.sukurtiSesija(SESIJOS_ID, saugomiDuomenys);
}

//Siunčiam šitą kai vartotojas paspaudžia atsijungti mygtuką
function istrintiCookie(req, res, next) {
  //Atsijungus vartotojui ištriname SESIJOS_ID
  const SESIJOS_ID = req.cookies.SESIJOS_ID;
  if (SESIJOS_ID) {
    uzklausaAutentifikacija.istrintiSesija(SESIJOS_ID);
    res.clearCookie("SESIJOS_ID");
    next();
    return;
  } else {
    next(apiKlaidos.blogasTokenas("Nerastas Sesijos_ID cookie header'į"));
    return;
  }
}

function sukurtiPuslapioCookie(SESIJOS_ID, res) {
  //res.setHeader("set-cookie", [`SESIJOS_ID=${SESIJOS_ID}; httponly; samesite=lax`])
  res.cookie("SESIJOS_ID", SESIJOS_ID, {
    httpOnly: true,
    secure: false, //poto pakeisti kai veiks i true
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: "lax",
  });
}

module.exports = {
  patikrintiCookie,
  sukurtiCookie,
  istrintiCookie,
};
