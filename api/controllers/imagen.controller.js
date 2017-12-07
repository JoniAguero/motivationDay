"use strict"
var fs = require('fs');
var moment = require('moment');

var Imagen = require('../models/imagen.model.js');
var path = require('path');

function crearImagen(req, res){

  var imagen = new Imagen();

  var parametros = req.body;
  imagen.titulo = parametros.titulo;
  imagen.desc = parametros.desc;
  imagen.idUsuario = parametros.idUsuario;
  imagen.nombreUsuario = parametros.nombreUsuario;
  imagen.fecha = moment().format();

  if(req.files){
    var rutaImagen = req.files.imagen.path;
    // var imagenSelect = rutaImagen.split("\\");
    var imagenSelect = rutaImagen.substr(-28)
    // imagen.imagen = imagenSelect[2];
    imagen.imagen = imagenSelect;
    if(parametros.titulo!= null && parametros.desc!=null){
      imagen.save((err, imagenGuardada) => {
        if(err){
          res.status(500).send({message: "Error al cargar imagen"});
        } else {
          if(!imagenGuardada){
            res.status(404).send({message: "No se encontro imagen"});
          } else {
            res.status(200).send({message: "Imagen subida correctamente: "+imagenGuardada});
          }
        }
      })
    }
  } else {
    res.status(500).send({message: "No se cargo ninguna imagen"});
  }
}

function getImagen(req, res){
  var id = req.params.id;
  Imagen.findOne({_id: id}, (err, imagen) => {
    if(err){
      res.status(500).send({message: "Error al cargar imagen"});
    } else {
      if(!imagen){
        res.status(404).send({message: "No se encontro imagen"});
      } else {
        res.status(200).send({imagen});
      }
    }
  })
}

function getImagenes(req, res){
  Imagen.find((err, imagenes) => {
    if(err){
      res.status(500).send({message: "Error al cargar imagenes"});
    } else {
      if(!imagenes){
        res.status(404).send({message: "No se encontraron imagenes"});
      } else {
        res.status(200).send({imagenes});
      }
    }
  })
}

function actualizarImagen(req, res){

  var imagen = new Imagen();

  var id = req.params.id;
  var parametros = req.body;

  imagen.titulo = parametros.titulo;
  imagen.desc = parametros.desc;
  imagen.idUsuario = parametros.idUsuario;
  imagen.nombreUsuario = parametros.nombreUsuario;

  var cambioImagen = false;
  if(parametros.actualizarImagen == 0){
    imagen.imagen = parametros.antiguaImagen;
    var cambioImagen = true;
  } else {
    if(!req.files){
      res.status(500).send({message: "No se selecciono ninguna imagen"});
    } else {
      var rutaImagen = req.files.imagen.path;
      var nuevaImagen = rutaImagen.split("\\");
      imagen.imagen = nuevaImagen[2];
      var antiguaImagen = parametros.antiguaImagen;
      var rutaAntiguaImagen = "./assets/imagenes/"+antiguaImagen;
      fs.unlink(rutaAntiguaImagen);
      var cambioImagen = true;
    }
  }

  if(cambioImagen){
    if(imagen.titulo != null && imagen.desc != null && imagen.imagen != null ){
      var actualizar = {
        "titulo": imagen.titulo,
        "desc": imagen.desc,
        "imagen": imagen.imagen,
        "idUsuario": imagen.idUsuario,
        "nombreUsuario": imagen.nombreUsuario
      }
      Imagen.findByIdAndUpdate(id, actualizar, (err, imagenActualizada) => {
        if(err){
          res.status(500).send({message: "Error al actualizar imagen"});
        } else {
          if(!imagenActualizada){
            res.status(404).send({message: "No se encontro imagen"});
          } else {
            res.status(200).send({message: "Imagen actualizada: "+imagenActualizada});
          }
        }
      })
    }
  }
}

function borrarImagen(req, res){
  var id = req.params.id;
  //Primero eliminamos la imagen de la carpeta assets
  Imagen.findOne({_id: id}, (err, imagenSelect) => {
    if(err){
      res.status(500).send({message: "Error al eliminar imagen"});
    } else {
      if(!imagenSelect){
        res.status(404).send({message: "No se encontro imagen"});
      } else {
        var imagenEliminada = imagenSelect.imagen;
        var rutaImagen = "./assets/imagenes/"+imagenEliminada;
        fs.unlink(rutaImagen);
      }
    }
  })

  setTimeout(function(){
    Imagen.findByIdAndRemove(id, (err,imagenEliminada) => {
      if(err){
        res.status(500).send({message: "Error al encontrar Imagen"});
      } else {
        if(!imagenEliminada){
          res.status(404).send({message: "No se encontro imagen a borrar"});
        } else {
          res.status(200).send({message: "Se elimino exitosamente: "+imagenEliminada})
        }
      }
    })
  },1000)
}

function mostrarImagen(req, res){
  var imagen = req.params.imagen;
  var rutaImagen = "./assets/imagenes/"+imagen;
  console.log(rutaImagen);
  fs.exists(rutaImagen, function(exists){
    if(exists){
      res.sendFile(path.resolve(rutaImagen))
      console.log("si existe");
    } else {
      console.log("no existe");
      res.status(404).send({message: "La imagen no existe"});
    }
  })
}

module.exports = {
  getImagenes,
  getImagen,
  crearImagen,
  actualizarImagen,
  borrarImagen,
  mostrarImagen
}
