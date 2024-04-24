// historialRoutes.js
const express = require('express');
const router = express.Router();
const { obtenerHistorialPorDispositivo, crearRegistroHistorial } = require('../controllers/historialController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, obtenerHistorialPorDispositivo); 
router.post('/crear', verifyToken, crearRegistroHistorial); 

module.exports = router;
