const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile  } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);

module.exports = router;
