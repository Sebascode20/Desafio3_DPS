const db = require('../models/db');
const bcrypt = require('bcryptjs');

const Usuario = {};

// Buscar usuario por correo
Usuario.buscarPorCorreo = async (correo) => {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  console.log('🔍 Resultado de buscarPorCorreo:', rows);
  return rows[0]; 
};

// Crear nuevo usuario
Usuario.crear = async (correo, contraseniaPlano) => {
  const hash = await bcrypt.hash(contraseniaPlano, 10);
  console.log('📌 Hash generado para nuevo usuario:', hash);
  const [result] = await db.query(
    'INSERT INTO usuarios (correo, contrasenia) VALUES (?, ?)',
    [correo, hash]
  );
  console.log('✅ Usuario insertado con ID:', result.insertId);
  return result.insertId;
};

// Verificar contraseña
Usuario.verificarContrasenia = async (contraseniaPlano, hashAlmacenado) => {
  const match = await bcrypt.compare(contraseniaPlano, hashAlmacenado);
  console.log('🔐 Comparando contraseña:', contraseniaPlano);
  console.log('🔐 Hash almacenado:', hashAlmacenado);
  console.log('✅ ¿Coinciden?', match); // LOG AQUÍ
  return match;
};

module.exports = Usuario;
