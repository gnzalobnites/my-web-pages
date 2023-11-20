const express = require('express');
const path = require('path'); 
const PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cosas = require('./cosas.js'); 
var js_pug_router = require('./public/javascript/javascript.js'); 
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var esquemaPersona = mongoose.Schema({
  nombre: String,
  edad: Number,
  nacionalidad: String
});
var Persona = mongoose.model("Persona", esquemaPersona);

const app = express();

app.set('view engine', 'pug');

app.set('views', [
  './views',
  './public/javascript' 
]); 

app.use(cookieParser())

// para analizar application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

//Para analizar datos json
app.use(bodyParser.json())

// para analizar multipart/form-data
app.use(upload.array());

app.get('/cookie', function(req, res){
  //res.cookie('name', 'express').send(`<p><b>cookie configurada como <br> {name: ${req.cookies.name}}</b></p>`);
  res.cookie('name', 'express').json(req.cookies)
});

app.get('/form', function(req, res){
  res.render('form');
});

app.post('/form', function(req, res){
  console.log(req.body);
  res.send("recibí tu solicitud!");
});

// Configura la carpeta estática para tus archivos
app.use(express.static(path.join(__dirname, 'public')));

//Manejador de ruta
app.get('/', function (req, res) {

	// Agregar encabezados para deshabilitar la caché
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	      
	// Enviar el archivo index.html como respuesta
  res.sendFile(path.join(__dirname, '/public/index.html'));
});                                                                                                                                            

app.use('/javascript-pug', js_pug_router);

app.get('*', function(req, res){
  res.send('<h1>Lo siento, esta es una URL no válida.</h1>');
});
    
app.listen(PORT, function () {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
      
