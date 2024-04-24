const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const { obtenerValoresDispositivo } = require('../controllers/dispositivoController');
const router = express.Router();

// Ruta para obtener valores del dispositivo asociado al usuario autenticado
router.get('/valores', verifyToken, obtenerValoresDispositivo);

module.exports = router;
