'use strict'

var mongoose = require('mongoose');

var app = require('./app');
var port = process.env.PORT || 1234;

mongoose.connect("mongodb://localhost:27017/motivationday", { useMongoClient: true }, (error, res) => {
  if(error){
    throw error;
  } else {
    console.log("La conexión con la DB fue exitosa.");
    app.listen(port, function(){
      console.log("Servidor API en puerto: " + port);
    })
  }
})
