const express = require('express');
const path = require('path'); 
const PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var router_js_pug = require('./public/javascript/router_js_pug.js');
var router_manejo_sesión = require('./router_manejo_sesión.js'); 
var cookieParser = require('cookie-parser');
var session = require('express-session');

const app = express();

app.set('view engine', 'pug');
app.set('views', [
  './views' 
]); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({
  secret: "¡Shh, es un secreto!",
  resave: true
}));

app.use('/acceso', router_manejo_sesión);

app.get('/contador-de-sesiones', function(req, res){
  if(req.session.page_views){
     req.session.page_views++;
     res.send("Has visitado esta página " + req.session.page_views + " veces");
  } else {
     req.session.page_views = 1;
     res.send("¡Bienvenido a esta página por primera vez!");
  }
});
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

app.use('/javascript-pug', router_js_pug);

app.get('*', function(req, res){
  res.send('<h1>Lo siento, esta es una URL no válida.</h1>');
});
    
app.listen(PORT, function () {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
      
