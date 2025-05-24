const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');

// Registro
exports.register = async (req, res) => {
  const { correo, contrasenia } = req.body;
  if (!correo || !contrasenia)
    return res.status(400).json({ message: 'Campos requeridos' });

  try {
    const usuarioExistente = await Usuario.buscarPorCorreo(correo);
    if (usuarioExistente)
      return res.status(400).json({ message: 'Usuario ya registrado' });

    const id = await Usuario.crear(correo, contrasenia);
    res.status(201).json({ message: 'Usuario registrado', id });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { correo, contrasenia } = req.body;

  try {
    const user = await Usuario.buscarPorCorreo(correo);
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const isMatch = await Usuario.verificarContrasenia(contrasenia, user.contrasenia);
    if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

