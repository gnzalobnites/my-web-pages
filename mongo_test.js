var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mi_db');
var personaSchema = mongoose.Schema({
  nombre: String,
  edad: Number,
  nacionalidad: String
});
var Persona = mongoose.model("Persona", personaSchema);

var app = express();

app.set('view engine', 'pug'); 
app.set('views', './views');

// para analizar application/json
app.use(bodyParser.json());

// para analizar application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// para analizar multipart/form-data
app.use(upload.array());  

app.get('/', function(req, res){
  res.render('form');
});

app.get('/persona', function(req, res){
  res.render('persona'); 
});

app.post('/', function(req, res){
  console.log(req.body);
  res.send("recibí tu solicitud!");
});

app.post('/persona', function(req, res){
  var infoPersona = req.body; //Obtener la información analizada
  if(!infoPersona.nombre || !infoPersona.edad || !infoPersona.nacionalidad){
    res.render('mostrar_mensaje', {
      mensaje: "Lo siento, proporcionaste información incorrecta", 
      tipo: "error"
      });      
   } else {
    var nuevaPersona = new Persona({
      nombre: infoPersona.nombre,
      edad: infoPersona.edad,
      nacionalidad: infoPersona.nacionalidad
    });
    nuevaPersona.save().then(() => {
		res.render('mostrar_mensaje', {
          mensaje: "Nueva persona agregada", 
          tipo: "éxito", 
          persona: infoPersona
        });
		console.log('Document saved successfully');
	  }).catch(err => {
		res.render('mostrar_mensaje', {
          mensaje: "Error de base de datos", 
          tipo: "error"
        });
		console.error('Error saving document:', err);
	  });
   }
});

app.listen(3000);
