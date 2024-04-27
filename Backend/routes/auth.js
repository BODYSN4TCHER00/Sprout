const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Dispositivo = require('../models/Dispositivo');
const router = express.Router();
const helmet = require('helmet');

router.use(helmet()); // Aplica las cabeceras de seguridad recomendadas por Helmet

// Validación de entradas con express-validator o similar
const { check, validationResult } = require('express-validator');

// Ruta de registro con validaciones
router.post('/register', [
  check('email', 'Por favor incluye un email válido').isEmail(),
  check('password', 'La contraseña debe tener 6 o más caracteres').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nombre, apellido, email, telefono, password, rol = 'usuario' } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const newUser = new User({
      nombre,
      apellido,
      email,
      telefono,
      password: hashedPassword,
      rol
    });

    const savedUser = await newUser.save();

    try {
      const newDispositivo = new Dispositivo({
        usuario: savedUser._id,
        humedad: 0,
        temperatura: 0,
        luz: 0,
      });

      await newDispositivo.save();
    } catch (error) {
      console.error('Error al crear dispositivo:', error);
    }

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' });

    res.status(201).json({
      token,
      userId: savedUser._id,
      message: 'Usuario registrado correctamente'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

// Ruta de login
router.post('/login', [
  check('email', 'Incluye un email válido').isEmail(),
  check('password', 'La contraseña es requerida').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' });
    res.status(200).json({ token, user: { id: user._id, name: user.nombre } });
  } catch (err) {
    res.status(500).json({ message: 'Error interno del servidor', err });
  }
});

module.exports = router;
