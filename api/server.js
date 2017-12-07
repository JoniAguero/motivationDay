var app = require('./app'); // this is your express app
var http = require('http'); // 3. HTTP server

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT; // 2. Using process.env.PORT
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

var mongoose = require('mongoose');

mongoose.connect("mongodb://joniagu:j0n1ml4b@ds249545.mlab.com:49545/motivationday", { useMongoClient: true }, (error, res) => {
  if(error){
    throw error;
  } else {
    console.log("La conexión con la DB fue exitosa.");
    server.listen(port, function(){
      console.log("Servidor API funcionando");
    })
  }
})
