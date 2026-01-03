var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/mi_db');
// ✅ Código corregido en router_manejo_sesión.js
// var mongoose = require('mongoose');
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mi_db';
// mongoose.connect(MONGODB_URI);
const mongoose = require('./db');
var esquemaUsuario = mongoose.Schema({
  id: String,
  password: String,
  preferencias: {
    color: String,
    tama_hora: Number
  }
});
var Usuarios = mongoose.model("Usuarios", esquemaUsuario);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(upload.array());
router.use(session({
    secret: "¡Shh, es un secreto!",
    resave: true
}));
router.get('/login', function(req, res){
  res.render('login');
});
router.post('/login', function(req, res){
  console.log(Usuarios);
  if(!req.body.id || !req.body.password){
     res.render('login', {message: "Por favor, introduce tanto el ID como la contraseña"});
  } else {
    Usuarios.findOne({id: req.body.id}).then((resBuscUno) => {
      if(resBuscUno.id === req.body.id && resBuscUno.password === req.body.password){
        req.session.user = resBuscUno;
        res.redirect('/acceso/protected_page');
      } else {
        res.render('login', {message: "Credenciales no válidas."});
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
router.post('/configurar_color_favorito', checkSignIn, function(req, res){
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
router.get('/protected_page', checkSignIn, function(req, res){
    res.render('protected_page', {
      id: req.session.user.id,
      color: req.session.user.preferencias.color
    })
});
router.get('/logout', function(req, res){
  req.session.destroy(function(){
     console.log("Usuario desconectado.")
  });
  res.redirect('/acceso/login');
});
router.get('/registrarse', function(req, res){
    res.render('signup');
});
router.post('/registrarse', function(req, res){
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
router.use('/protected_page', function(err, req, res, next){
    console.log(err);
    //El usuario debe estar autenticado. Redirígelo para iniciar sesión.
    res.redirect('/acceso/login');
});
router.get('/contador-de-sesiones', function(req, res){
  if(req.session.page_views){
     req.session.page_views++;
     res.send("Has visitado esta página " + req.session.page_views + " veces");
  } else {
     req.session.page_views = 1;
     res.send("¡Bienvenido a esta página por primera vez!");
  }
});

module.exports = router;
