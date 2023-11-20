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

app.get('/crear-cookie/:nombre/:valor', function(req, res){
  res.cookie(req.params.nombre, req.params.valor).json(req.cookies);
  //Establecer cookies desde el consola: document.cookie = 'nombre=valor'
});

app.get('/cookie-expire/:ms', function(req, res){
  res.cookie('cookie_de_tipo_2', 'expire',{expire: req.params.ms + Date.now()}).json(req.cookies)
});

app.get('/cookie-maxAge', function(req, res){
  res.cookie('cookie_de_tipo_3', 'maxAge',{maxAge: 36000}).json(req.cookies)
});

app.get('/eliminar-cookie/:nombre', function(req, res){
  res.clearCookie(req.params.nombre);
  res.send('cookie ' + req.params.nombre + ' foo cleared');
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
      
