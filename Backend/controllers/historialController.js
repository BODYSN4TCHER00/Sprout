const Historial = require('../models/Historial');
const Dispositivo = require('../models/Dispositivo');

exports.obtenerHistorialPorDispositivo = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const usuarioId = req.user._id;
    
    const dispositivo = await Dispositivo.findOne({ usuario: usuarioId });
    if (!dispositivo) {
      return res.status(404).send('Dispositivo no encontrado para el usuario.');
    }

    const query = {
      dispositivo: dispositivo._id,
      fecha: {
        $gte: startDate,
        $lte: endDate
      }
    };

    // Solo filtra y ordena los registros sin agruparlos.
    const historial = await Historial.find(query).sort({ fecha: 1, hora: 1 });

    res.json(historial.map(h => {
      return {
        fecha: h.fecha,
        hora: h.hora,
        temperatura: h.temperatura, // Si deseas la temperatura individual en lugar del promedio
        humedad: h.humedad,
        luz: h.luz
      };
    }));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor al obtener el historial.');
  }
};

exports.crearRegistroHistorial = async (req, res) => {
  try {
    // Obtienes el ID del usuario del token
    const usuarioId = req.user._id;
    const { temperatura, humedad, luz, fecha, hora } = req.body;

    // Encuentra el dispositivo asociado al usuario. Asegúrate de que el usuario tiene solo un dispositivo.
    const dispositivo = await Dispositivo.findOne({ usuario: usuarioId });
    if (!dispositivo) {
      return res.status(404).send('Dispositivo no encontrado para el usuario.');
    }

    // Ahora tienes el ID del dispositivo y puedes crear el registro de historial.
    const nuevoRegistro = new Historial({
      dispositivo: dispositivo._id, // Este es el ID del dispositivo
      temperatura,
      humedad,
      luz,
      fecha,
      hora
    });

    // Guardar el nuevo registro de historial
    const registroGuardado = await nuevoRegistro.save();
    res.status(201).json(registroGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor al crear el registro de historial.');
  }
};
