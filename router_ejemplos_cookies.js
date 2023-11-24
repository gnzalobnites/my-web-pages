var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

router.get('/crear-cookie/:nombre/:valor', function(req, res){
  res.cookie(req.params.nombre, req.params.valor).json(req.cookies);
  //Establecer cookies desde el consola: document.cookie = 'nombre=valor'
});
router.get('/cookie-expire/:ms', function(req, res){
  res.cookie('cookie_de_tipo_2', 'expire',{expire: req.params.ms + Date.now()}).json(req.cookies)
});
router.get('/cookie-maxAge', function(req, res){
  res.cookie('cookie_de_tipo_3', 'maxAge',{maxAge: 36000}).json(req.cookies)
});
router.get('/eliminar-cookie/:nombre', function(req, res){
  res.clearCookie(req.params.nombre);
  res.send('cookie ' + req.params.nombre + ' foo cleared');
});
module.exports = router;