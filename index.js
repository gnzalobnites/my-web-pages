const express = require('express');
const path = require('path'); 
const PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var js_pug_router = require('./public/javascript/javascript.js'); 
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mi_db');
var esquemaUsuario = mongoose.Schema({
  id: String,
  password: String,
  preferencias: {
    color: String
  }
});
var Usuarios = mongoose.model("Usuarios", esquemaUsuario);

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

var Users = [];
app.get('/signup', function(req, res){
  res.render('signup');
});
app.post('/signup', function(req, res){
  var reqBody = req.body;
  if (!reqBody.id || !reqBody.password) {
    res.render('mostrar_mensaje', {
      mensaje: "Lo siento, proporcionaste información incorrecta", 
      tipo: "error"
    });
  } else {
    Usuarios.findOne({id: reqBody.id}).then((resBuscUno) => {
      if (resBuscUno) {
        // Si el usuario ya existe, muestra un mensaje de error
        res.render('mostrar_mensaje', {
          mensaje: "El usuario ya existe, inicie sesión", 
          tipo: "error"
        });
      } else {
        // Si el usuario no existe, crea uno nuevo
        var newUser = new Usuarios({
          id: reqBody.id,
          password: reqBody.password,
          preferencias: {
            color: "blanco"
          }
        });

        newUser.save().then(() => {
          res.render('mostrar_mensaje', {
            mensaje: "Nueva persona agregada", 
            tipo: "éxito", 
            persona: reqBody
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
    }).catch(err => {
      // Manejar errores de la búsqueda de usuario
      res.render('mostrar_mensaje', {
        mensaje: "Error de base de datos", 
        tipo: "error"
      });
      console.error('Error searching for document:', err);
    });
    console.log(reqBody);
  }
});
function checkSignIn(req, res, next){
  if(req.session.user){
     next(); //Si la sesión existe, continúa a la página
  } else {
     var err = new Error("No has iniciado sesión.");
     console.log(req.session.user);
     next(err); //Error, intentando acceder a una página no autorizada
  }
}
app.get('/protected_page', checkSignIn, function(req, res){
  res.render('protected_page', {
    id: req.session.user.id,
    color: req.session.user.preferencias.color
  })
});
app.post('/configurar_color_favorito', checkSignIn, function(req, res){
  const Usuarios = mongoose.model('Usuarios');
  Usuarios.findOneAndUpdate({id: req.body.id}, {
    preferencias: {
      color: req.body.color
    },
  }).then((usuario_actualizado) => {
    console.log(usuario_actualizado);
    res.status(200).send("Color favorito configurado correctamente");
  }).catch((error) => {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).send("Error al configurar el color favorito");
  });
});

app.get('/login', function(req, res){
  res.render('login');
});
app.post('/login', function(req, res){
  console.log(Usuarios);
  if(!req.body.id || !req.body.password){
     res.render('login', {message: "Por favor, introduce tanto el ID como la contraseña"});
  } else {
    Usuarios.findOne({id: req.body.id}).then((resBuscUno) => {
      if(resBuscUno.id === req.body.id && resBuscUno.password === req.body.password){
        req.session.user = resBuscUno;
        res.redirect('/protected_page');
      } else {
        res.render('login', {message: "Credenciales no válidas."});
      }
      
    });
  }
});
app.get('/logout', function(req, res){
  req.session.destroy(function(){
     console.log("Usuario desconectado.")
  });
  res.redirect('/login');
});
app.use('/protected_page', function(err, req, res, next){
console.log(err);
  //El usuario debe estar autenticado. Redirígelo para iniciar sesión.
  res.redirect('/login');
});
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

app.use('/javascript-pug', js_pug_router);

app.get('*', function(req, res){
  res.send('<h1>Lo siento, esta es una URL no válida.</h1>');
});
    
app.listen(PORT, function () {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
      
