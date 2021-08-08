const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const apiKlaidosHandler = require("./klaidos/apiKlaidos-handler");
require("dotenv/config");

require("./paslaugos/zinutes");

//const cron = require("node-cron");
const socket = require("socket.io");

const programa = express();
const PORT = process.env.PORT || 6900;

programa.use(
  cors({
    origin: process.env.FRONTENDURL, // serverio front-end adresas
    credentials: true,
  })
);
programa.use(express.json());
programa.use(cookieParser());
programa.use(express.urlencoded({ extended: true }));
//programa.use(bodyParser.json());

//Importuoti maršrutai
require("./marsrutai/marsrutai")(programa);

programa.use(apiKlaidosHandler);
//Klausomės įvado

var serveris = programa.listen(PORT, () => {
  //programa
  console.log("Serveris pradėjo darbą:", PORT);
});

//Socketai bendravimui
var io = socket(serveris, {
  cors: {
    origin: process.env.FRONTENDURL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("prisijungti", function (duomenys) {
    socket.join(duomenys.id_vizitas);
    //console.log(duomenys.vardas + ' ' + duomenys.pavarde + ' prisijungė prie pokalbio.');

    //socket.broadcast.to(duomenys.id_vizitas).emit('prisijunge', {busena: 'Prisijungęs'});
  });

  socket.on("atsijungti", function (duomenys) {
    //console.log(duomenys.vardas + ' ' + duomenys.pavarde + ' atsijungė iš pokalbio.');

    //socket.broadcast.to(duomenys.id_vizitas).emit('atsijunge', {busena: 'Atsijungęs'});

    socket.leave(duomenys.id_vizitas);
  });

  socket.on("zinute", function (duomenys) {
    io.in(duomenys.id_vizitas).emit("nauja zinute", duomenys);
  });
});
