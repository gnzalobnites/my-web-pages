var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
  res.send('Ruta GET en cosas.'); 
});

router.post('/', function(req, res){
  res.send('Ruta POST en cosas.\n');
});

//exportar este router para usarlo en nuestro index.js 
module.exports = router;
