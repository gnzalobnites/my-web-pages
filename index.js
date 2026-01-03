const express = require('express');
const path = require('path'); 
const PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cookieParser = require('cookie-parser');
var router_js_pug = require('./public/javascript/router_js_pug.js');
var router_reloj_pug = require('./public/mi-reloj-web/router_reloj_pug.js');
var router_manejo_sesión = require('./router_manejo_sesión.js');
var router_sesión_reloj = require('./public/mi-reloj-web/router_sesión_reloj.js'); 
var router_ejemplos_cookies = require('./router_ejemplos_cookies.js');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.set('view engine', 'pug');
app.set('views', [
  './views',
  './public/javascript',
  './public/mi-reloj-web'
]);

app.get('/test-cookies', function(req, res){
  const cookies = req.cookies.modo;
  res.json(cookies);
});

app.use('/acceso', router_manejo_sesión);
//app.use('/acceso-reloj', router_sesión_reloj);
app.use('/ejemplos-cookies', router_ejemplos_cookies);
app.use('/javascript-pug', router_js_pug);
app.use('/reloj-pug', router_reloj_pug);
app.use('/reloj-pug', router_sesión_reloj); // ← Agrega esta línea
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

/* app.get('*', function(req, res){
  res.send('<h1>Lo siento, esta es una URL no válida.</h1>');
}); */
    
app.listen(PORT, function () {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
      
