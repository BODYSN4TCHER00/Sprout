const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    try {
        // Utiliza req.user._id, que debería ser la propiedad asignada por el middleware verifyToken
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        // Devuelve la información del usuario, considera omitir datos sensibles como la contraseña
        res.json({
            id: user._id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            telefono: user.telefono,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};

// Mtodo para actualizar el perfil del usuario
exports.updateUserProfile = async (req, res) => {
    const { nombre, apellido, email, telefono } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            nombre, 
            apellido, 
            email, 
            telefono
        }, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.json({
            id: user._id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            telefono: user.telefono,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};
