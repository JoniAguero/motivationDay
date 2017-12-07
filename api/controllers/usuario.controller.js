"use strict"
var bcrypt = require('bcrypt-nodejs');

var Usuario = require("../models/usuario.model.js");
var token = require("../token/token.js");

function pruebaUsuario(req, res){
  res.status(200).send({message: 'Probando Controlador'});
}

function crearUsuario(req, res){
  var nuevoUsuario = new Usuario();
  var parametros = req.body;

  if(parametros.nombreUsuario && parametros.nombreCompleto && parametros.password){
    nuevoUsuario.nombreReal = parametros.nombreCompleto;
    nuevoUsuario.usuario = parametros.nombreUsuario;
    nuevoUsuario.password = parametros.password;
    nuevoUsuario.save((error, usuarioGuardado) => {
      if(error){
        res.status(500).send({message: "Error al guardar el Usuario"});
      } else {
        res.status(200).send({message: "Usuario Creado con éxito: "+usuarioGuardado})
      }
    })
  }
}

function loginUsuario(req, res){

  var parametros = req.body;
  var usuario = parametros.nombreUsuario;
  var password = parametros.password;

  Usuario.findOne({usuario:usuario}, (err, usuarioLogueado) => {
    if(err){
      res.status(500).send({message: "Error al loguear usuario"});
    } else {
      if (!usuarioLogueado) {
        res.status(404).send({message: "Usuario y/o contraseña incorrectos"});
      } else {
          if(parametros.token){
            res.status(200).send({token: token.crearToken(usuarioLogueado), usuario: usuarioLogueado});
          }
         else {
          res.status(404).send({message: "Usuario y/o contraseña incorrectos"});
        }
      }
    }
  })
}

function actualizarUsuario(req, res){
  var id = req.params.id;
  var actualizar = req.body;

  if(id != req.usuarioToken.sub){
    return res.status(500).send({message: "No puedes actualizar el usuario"});
  } else {
    Usuario.findByIdAndUpdate(id, actualizar, function(err, usuarioActualizado){
      if(err){
        res.status(500).send({message: "Error al actualizar Usuario"});
      } else {
        if(!usuarioActualizado){
          res.status(404).send({message: "No se encontro usuario a actualizar"});
        } else {
          res.status(200).send({message: "Se actualizo exitosamente: "+usuarioActualizado})
        }
      }
    })
  }
}

function borrarUsuario(req, res){

  var id = req.params.id;
  if(id != req.usuarioToken.sub){
    return res.status(500).send({message: "No puedes borrar el usuario"});
  } else {
    Usuario.findByIdAndRemove(id, (err,usuarioBorrado) => {
      if(err){
        res.status(500).send({message: "Error al borrar Usuario"});
      } else {
        if(!usuarioBorrado){
          res.status(404).send({message: "No se encontro usuario a borrar"});
        } else {
          res.status(200).send({message: "Se elimino exitosamente: "+usuarioBorrado})
        }
      }
    })
  }
}

function getUsuario(req, res){
  var id = req.params.id;
  Usuario.findOne({_id: id}, (err, usuario) => {
    if(err){
      res.status(500).send({message: "Error al cargar usuario"});
    } else {
      if(!usuario){
        res.status(404).send({message: "No se encontro usuario"});
      } else {
        res.status(200).send({usuario});
      }
    }
  })
}

function getUsuarios(req, res){
  Usuario.find((err, usuarios) => {
    if(err){
      res.status(500).send({message: "Error al cargar usuarios"});
    } else {
      if(!usuarios){
        res.status(404).send({message: "No se encontraron usuarios"});
      } else {
        res.status(200).send({usuarios});
      }
    }
  })
}

module.exports = {
  pruebaUsuario,
  loginUsuario,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  getUsuario,
  getUsuarios
}
