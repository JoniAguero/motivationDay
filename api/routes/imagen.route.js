"use strict"
var express = require('express');

var multipart = require('connect-multiparty');
var fichero = multipart({uploadDir: "./assets/imagenes"});

var ControladorImagen = require('../controllers/imagen.controller.js');
var authorizationToken = require('../token/aut.js')

var api = express.Router();

api.get("/imagenes", ControladorImagen.getImagenes);
api.get("/imagen/:id", ControladorImagen.getImagen);
api.get("/ver-imagen/:imagen", ControladorImagen.mostrarImagen);
api.post("/crear-imagen", [authorizationToken.autenticacion, fichero], ControladorImagen.crearImagen);
api.put("/actualizar-imagen/:id", [authorizationToken.autenticacion, fichero], ControladorImagen.actualizarImagen);
api.delete("/borrar-imagen/:id", authorizationToken.autenticacion, ControladorImagen.borrarImagen);

module.exports = api;
