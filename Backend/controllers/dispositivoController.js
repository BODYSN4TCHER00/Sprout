const Dispositivo = require('../models/Dispositivo');

exports.obtenerValoresDispositivo = async (req, res) => {
  try {
    // ID del usuario se añade a req.user en el middleware de autenticación
    const usuarioId = req.user._id;
    const dispositivo = await Dispositivo.findOne({ usuario: usuarioId });
    
    if (!dispositivo) {
      return res.status(404).send('Dispositivo no encontrado para el usuario');
    }
    
    res.json({
      humedad: dispositivo.humedad,
      temperatura: dispositivo.temperatura,
      luz: dispositivo.luz
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los valores del dispositivo');
  }
};
