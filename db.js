// db.js
const mongoose = require('mongoose');

// Usa la variable de entorno si está disponible, de lo contrario usa la conexión local (para desarrollo)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mi_db';

// Conecta una sola vez
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Exporta la instancia de mongoose para que otros archivos puedan usar los modelos
module.exports = mongoose;
