var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mi_db');
var esquemaUsuario = mongoose.Schema({
  id: String,
  password: String,
  preferencias: {
    color_fondo: String,
    color_fuente: String,
    tamaño_hora: Number,
    tamaño_segundos: Number,
    tamaño_fecha: Number
  }
});
var Usuarios_reloj = mongoose.model("Usuarios_reloj", esquemaUsuario);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(upload.array());
router.use(session({
    secret: "¡Shh, es un secreto!",
    resave: true
}));
router.get('/', function(req, res){
  res.render('plantilla_sin_main_reloj', {
    title: "Mi reloj web",
    google_site_verification_content:"IlwE29oPx3IJib2qhYUc07f7uJp7SpVM12hd1DnPiqE",
    apple_touch_icon_180_href: 'https://gonzalo-web-pages.onrender.com/mi-reloj-web/apple-touch-icon.png',
    icon_32_href: '/mi-reloj-web/favicon-32x32.png',
    icon_16_href: '/mi-reloj-web/favicon-16x16.png',
    manifest_href: '/mi-reloj-web/site.webmanifest',
    icon_safari_color: '#da532c',
    theme_color_content: '#ffffff',
    description_content: 'Aprende JavaScript desde cero con este curso gratuito. En este curso aprenderás los fundamentos de Python, como variables, tipos de datos, operaciones, flujo de control, funciones, objetos, módulos y excepciones. También aprenderás a usar librerías populares de Python, como NumPy, Pandas y Matplotlib.',
    og_site_name: 'My Web Clock',
    og_title: 'Reloj personalizado para tu escritorio',
    og_description: 'Reloj personalizado para tu escritorio. Elige el color y tamaño de fondo y fuente para crear un reloj único y a tu medida."',
    og_url: 'https://gonzalo-web-pages.onrender.com/mi-reloj-web-pug',
    og_image: 'https://gonzalo-web-pages.onrender.com/mi-reloj-web/og_image1.jpg',
    article_tag_1: 'Clock',
    article_tag_2: 'Customizable',
    article_tag_3: 'App',
    //modo: req.cookies.modo
  }); 
  //console.log(req.cookies.modo)
});
router.get('/login-reloj', function (req, res) {
  res.render("login_reloj_sin_main")
})
router.post('/login-reloj', function(req, res){
  console.log(req.body.id +' '+ req.body.password);
  if(!req.body.id || !req.body.password){
     res.render('login', {message: "Por favor, introduce tanto el ID como la contraseña"});
  } else {
    Usuarios_reloj.findOne({id: req.body.id}).then((resBuscUno) => {
      if (resBuscUno == null) {
          res.render('signup_reloj_sin_main', {message: "Usuario no encontrado. Regístrese"})
      } else {
        if(resBuscUno.id === req.body.id && resBuscUno.password === req.body.password){
          req.session.user = resBuscUno;
          res.redirect('/reloj-pug/plantilla_sin_main_protegida_reloj');
        } else {
          res.render('login_reloj_sin_main', {message: "Credenciales no válidas."});
        }
      }
      
      
    });
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
router.get('/plantilla_sin_main_protegida_reloj', checkSignIn, function(req, res){
  res.render('plantilla_sin_main_protegida_reloj', {
    id: req.session.user.id,
    color: req.session.user.preferencias.color
  })
});
router.get('/logout', function(req, res){
req.session.destroy(function(){
   console.log("Usuario desconectado.")
});
res.redirect('/reloj-pug');
});
router.get('/registrarse', function(req, res){
  res.render('signup_reloj_sin_main');
});
router.post('/registrarse', function(req, res){
var reqBody = req.body;
if (!reqBody.id || !reqBody.password) {
  res.render('mostrar_mensaje', {
    mensaje: "Lo siento, proporcionaste información incorrecta", 
    tipo: "error"
  });
} else {
  Usuarios_reloj.findOne({id: reqBody.id}).then((resBuscUno) => {
    if (resBuscUno) {
      // Si el usuario ya existe, muestra un mensaje de error
      res.render('mostrar_mensaje', {
        mensaje: "El usuario ya existe, inicie sesión", 
        tipo: "error"
      });
    } else {
      // Si el usuario no existe, crea uno nuevo
      var newUser = new Usuarios_reloj({
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
router.use('/protected_page', function(err, req, res, next){
  console.log(err);
  //El usuario debe estar autenticado. Redirígelo para iniciar sesión.
  res.redirect('/reloj-pug/login');
});
router.get('/signup-reloj', function (req, res) {
  res.render("signup_reloj_sin_main")
})
//exportar este router para usarlo en nuestro index.js 
module.exports = router;