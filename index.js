const express = require('express');
const path = require('path'); // Añade esta línea
const PORT = process.env.PORT || 3030;

const app = express();

// Configura la carpeta estática para tus archivos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {

	// Agregar encabezados para deshabilitar la caché
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	      
	// Enviar el archivo index.html como respuesta
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

var cosas = require('./cosas.js'); 

app.use('/cosas', cosas);

app.get('/:id', function(req, res){
	res.send('El id que especificaste es ' + req.params.id);
});

app.get('/cosas/:nombre/:id', function(req, res) {
  res.send('id: ' + req.params.id + ' y nombre: ' + req.params.nombre);
});  
    
app.listen(PORT, function () {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
      
