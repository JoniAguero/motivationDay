"use strict"

var token = require("jwt-simple");
var moment = require('moment');

var claveSecreta = "TalleresPasion";

exports.autenticacion = function(req, res, next){
  if(!req.headers.authorization) {
    return res.status(403).send({message: "No tienes permisos"})
  } else {
    var tokenEnviado = req.headers.authorization.replace(/['"]+/g, "");
    try {
      var cargarToken = token.decode(tokenEnviado, claveSecreta);
      if(cargarToken.exp <= moment().unix()){
        return res.status(403).send({message: "El token ha expirado"});
      }
    } catch(excepcion) {
      return res.status(403).send({message: "El token no es válido"});
    }
    req.usuarioToken = cargarToken;
    next();
    
  }

}
