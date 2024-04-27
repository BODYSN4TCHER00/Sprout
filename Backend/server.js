require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const dispositivoRoutes = require('./routes/dispositivoRoutes');
const userRoutes = require('./routes/userRoutes');
const historialRoutes = require('./routes/historialRoutes');

const app = express();

// Middlewares de seguridad
app.use(helmet()); // Ayuda a proteger la aplicación de algunas vulnerabilidades web conocidas
app.use(cors({
  origin: 'https://sprout-af636.web.app', // Configuración correcta de CORS
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Parsea las solicitudes JSON entrantes

// Limitación de tasa de peticiones
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // Limita cada IP a 100 solicitudes por ventana de tiempo
});
app.use(limiter);

// Middleware de logueo
app.use(morgan('combined')); // 'combined' genera logs detallados al estilo Apache

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((error) => console.error('Error al conectar con MongoDB:', error));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dispositivos', dispositivoRoutes);
app.use('/api/historial', historialRoutes);

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
