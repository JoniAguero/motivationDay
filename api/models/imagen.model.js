'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImagenSchema = Schema({
  titulo:String,
  desc:String,
  imagen:String,
  idUsuario:String,
  nombreUsuario:String,
  fecha:Date
});

module.exports = mongoose.model("Imagen", ImagenSchema);
