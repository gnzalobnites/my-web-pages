const express = require('express');
const path = require('path'); 
const PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var router_js_pug = require('./public/javascript/router_js_pug.js');
var router_manejo_sesión = require('./router_manejo_sesión.js'); 
var router_ejemplos_cookies = require('./router_ejemplos_cookies.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', [
  './views',
  './public/javascript'
]);

app.get('/test-cookies', function(req, res){
  const cookies = req.cookies;
  res.json(cookies);
});

app.use('/acceso', router_manejo_sesión);
app.use('/ejemplos-cookies', router_ejemplos_cookies);
app.use('/javascript-pug', router_js_pug);

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

app.get('*', function(req, res){
  res.send('<h1>Lo siento, esta es una URL no válida.</h1>');
});
    
app.listen(PORT, function () {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
      
