const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Dispositivo = require('../models/Dispositivo');
const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, password, rol = 'usuario' } = req.body;
    
    // Verificar si el email ya está en uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear un nuevo usuario
    const newUser = new User({
      nombre,
      apellido,
      email,
      telefono,
      password: hashedPassword,
      rol // Usa el valor por defecto si no se proporciona uno
    });

    // Guardar el nuevo usuario
    const savedUser = await newUser.save();

    try {
      const newDispositivo = new Dispositivo({
        usuario: savedUser._id,
        humedad: 0,
        temperatura: 0,
        luz: 0,
      });

      const savedDispositivo = await newDispositivo.save();
      console.log('Dispositivo creado:', savedDispositivo);
    } catch (error) {
      console.error('Error al crear dispositivo:', error);
    }

    // Generar token JWT para autenticación
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      userId: savedUser._id,
      message: 'Usuario y dispositivo creados correctamente'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error });
  }
});

// Ruta de login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email no encontrado.');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Contraseña incorrecta.');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ token, user: { id: user._id, name: user.nombre } });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
