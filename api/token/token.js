"use strict"

var token = require("jwt-simple");
var moment = require('moment');

var claveSecreta = "TalleresPasion"

exports.crearToken = function(usuarioSeleccionado){

  var cargarToken = {
    sub: usuarioSeleccionado._id,
    nombre: usuarioSeleccionado.usuario,
    now: moment().unix(),
    exp: moment().add(30, "days").unix()
  }

  return token.encode(cargarToken, claveSecreta);
}
