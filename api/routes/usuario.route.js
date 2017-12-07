"use strict"

var express = require('express');

var ControladorUsuario = require('../controllers/usuario.controller.js');
var authorizationToken = require('../token/aut.js')

var api = express.Router();

api.get("/prueba", authorizationToken.autenticacion, ControladorUsuario.pruebaUsuario);
api.get("/usuario/:id", ControladorUsuario.getUsuario);
api.get("/usuarios", ControladorUsuario.getUsuarios);
api.post("/crear-usuario", ControladorUsuario.crearUsuario);
api.post("/login-usuario", ControladorUsuario.loginUsuario);
api.put("/actualizar-usuario/:id", authorizationToken.autenticacion, ControladorUsuario.actualizarUsuario);
api.delete("/borrrar-usuario/:id", authorizationToken.autenticacion, ControladorUsuario.borrarUsuario);

module.exports = api;
