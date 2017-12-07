'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
  nombreReal:String,
  usuario:String,
  password:String
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
