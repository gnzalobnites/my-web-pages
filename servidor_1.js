const express = require('express');
const path = require('path'); // Añade esta línea

const app = express();

// Configura la carpeta estática para tus archivos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {

	// Agregar encabezados para deshabilitar la caché
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	      
	// Enviar el archivo index.html como respuesta
    res.sendFile(path.join(__dirname, '/public/buscador.html'));
});
    
app.listen(3000, function () {
    console.log('El servidor está escuchando en el puerto 3000');
});
      
