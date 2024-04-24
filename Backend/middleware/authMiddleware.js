// authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Acceso denegado. No se proporcionó token.');
  }
  
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Acceso denegado. Token inválido.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { _id: userId, ... }
    next();
  } catch (error) {
    res.status(400).send('Token inválido.');
  }
};

module.exports = verifyToken;
