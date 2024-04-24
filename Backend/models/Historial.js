// models/Historial.js
const mongoose = require('mongoose');

const historialSchema = new mongoose.Schema({
  dispositivo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dispositivo',
    required: true
  },
  temperatura: Number,
  humedad: Number,
  luz: Number,
  fecha: String, // Asumiendo que usas la fecha en formato 'YYYY-MM-DD'
  hora: String, // Formato 'HH:MM'
});

module.exports = mongoose.model('Historial', historialSchema);
