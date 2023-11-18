const express = require('express');
const path = require('path'); // Añade esta línea
const PORT = process.env.PORT || 3030;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer();
var cosas = require('./cosas.js'); 
var js_pug_router = require('./public/javascript/javascript.js'); 
const app = express();

app.set('view engine', 'pug');

app.set('views','./views');

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

//Registrador simple de tiempo de solicitud 
app.use(function(req, res, next){
  console.log("Una nueva solicitud recibida en " + Date.now());
  next();
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

app.get('/form', function(req, res){
  res.render('form');
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

app.get('/primera-vista-dinamica/:id(\\d{3})', function(req, res){
  res.render('vista_dinámica', {
    nombre: "google",
    url:"http://www.google.com",
    usuario: {id: req.params.id},
  });
});

app.use('/cosas', cosas); 

app.get('/cosas/:id(\\d{5})', function(req, res){
  res.send('id: ' + req.params.id);
});

app.use('/javascript-pug', js_pug_router);

app.get('*', function(req, res){
  res.send('<h1>Lo siento, esta es una URL no válida.</h1>');
});
    
app.listen(PORT, function () {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
      
