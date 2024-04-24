require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dispositivoRoutes = require('./routes/dispositivoRoutes');
const userRoutes = require('./routes/userRoutes');
const historialRoutes = require('./routes/historialRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((error) => console.error('Error al conectar con MongoDB:', error));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dispositivos', dispositivoRoutes);
app.use('/api/historial', historialRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
