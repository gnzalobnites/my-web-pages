var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mi_db');
var personaSchema = mongoose.Schema({
  nombre: String,
  edad: Number,
  nacionalidad: String
});
var Persona = mongoose.model("Persona", personaSchema);
//test Lubuntu
var app = express();

app.set('view engine', 'pug'); 
app.set('views', './views');

// para analizar application/json
app.use(bodyParser.json());

// para analizar application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// para analizar multipart/form-data
app.use(upload.array());  

app.get('/', function(req, res){
  res.render('form');
});

app.get('/persona', function(req, res){
  res.render('persona'); 
});

app.post('/', function(req, res){
  console.log(req.body);
  res.send("recibí tu solicitud!");
});

app.post('/persona', function(req, res){
  var reqBody = req.body; //Obtener la información analizada
  if(!reqBody.nombre || !reqBody.edad || !reqBody.nacionalidad){
    res.render('mostrar_mensaje', {
      mensaje: "Lo siento, proporcionaste información incorrecta", 
      tipo: "error"
      });      
   } else {
    var nuevoDocumentoPersona = new Persona({
      nombre: reqBody.nombre,
      edad: reqBody.edad,
      nacionalidad: reqBody.nacionalidad
    });
    nuevoDocumentoPersona.save().then(() => {
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
});

app.get('/personas', function(req, res){
  Persona.find().then((personas) => {
    res.json(personas);
  });
});

app.get('/buscar-uno/:id', async function(req, res){
  let colecciónPersona = mongoose.model('Persona');
  let persona_buscada = await colecciónPersona.findOne(
    {_id: req.params.id}
  );
  res.json(persona_buscada);
});

app.get('/actualizar-persona', function(req, res){
  res.render('actualizar_persona'); 
});

app.put('/actualizar-persona', function(req, res){
  //Persona.findByIdAndUpdate(req.params.id, req.body);
  Persona.update(
    {_id: req.params.id}, {
      $set: {
	nombre: req.params.nombre,
	edad: req.params.edad,
        nacionalidad: req.params.nacionalidad
      }
    }).then((persona_encontrada)=>{
      res.json(persona_encontrada});
    });
});


app.listen(3000);