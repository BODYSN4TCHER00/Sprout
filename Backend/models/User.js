// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefono: {
    type: String,
    required: false, 
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    default: 'usuario', 
  },
});

module.exports = mongoose.model('User', userSchema);
