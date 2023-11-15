const express = require('express');
const path = require('path'); // Añade esta línea
const PORT = process.env.PORT || 3030;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const app = express();

app.set('view engine', 'pug');

app.set('views','./views'); 

app.use(cookieParser())

//Para analizar datos codificados en URL
app.use(bodyParser.urlencoded({ extended: false })) 

//Para analizar datos json
app.use(bodyParser.json())

//Registrador simple de tiempo de solicitud 
app.use(function(req, res, next){

  console.log("Una nueva solicitud recibida en " + Date.now());
    
  next();
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

app.get('/primera_plantilla', function(req, res){
  res.render('primera_plantilla',{
   nombre: "Gonzalo"})
});

app.get('/primera-vista-dinamica', function(req, res){
  res.render('vista_dinámica', {
    nombre: "google",
    url:"http://www.google.com"
  });
});

var cosas = require('./cosas.js'); 

app.use('/cosas', cosas);

app.get('/:id', function(req, res){
	res.send('El id que especificaste es ' + req.params.id);
});

app.get('/cosas/:nombre/:id', function(req, res) {
  res.send('id: ' + req.params.id + ' y nombre: ' + req.params.nombre);
});  

app.get('/cosas/:id(\\d{5})', function(req, res){
  res.send('id: ' + req.params.id); 
});

app.use('/', function(req, res){

  console.log('Fin');
});

app.get('*', function(req, res){
  res.send('<h1>Lo siento, esta es una URL no válida.</h1>');
});
    
app.listen(PORT, function () {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
      
