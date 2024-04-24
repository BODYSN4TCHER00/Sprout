const mongoose = require('mongoose');

const dispositivoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  humedad: Number,
  temperatura: Number,
  luz: Number,
});

module.exports = mongoose.model('Dispositivo', dispositivoSchema);
