
const mongoose = require('mongoose');

const personajesSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  casa: { type: String, required: true },
  rol: { type: String, required: true },
  imagen: { type: String, default: '' } // Ruta de la imagen
});

module.exports = mongoose.model('Personajes', personajesSchema);

