const db = require('../models/db');

const Libro = {
  crear: async (libro) => {
    const query = `
      INSERT INTO libros (usuario_id, titulo, autor, estatus, fecha_inicio, fecha_fin, comentario)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      libro.usuario_id,
      libro.titulo,
      libro.autor,
      libro.estatus,
      libro.fecha_inicio || null,
      libro.fecha_fin || null,
      libro.comentario || null
    ];
    return db.query(query, values);
  },

  obtenerPorUsuario: async (usuarioId) => {
    const query = `SELECT * FROM libros WHERE usuario_id = ?`;
    return db.query(query, [usuarioId]);
  },

  obtenerPorId: async (id, usuarioId) => {
    const query = `SELECT * FROM libros WHERE id = ? AND usuario_id = ?`;
    return db.query(query, [id, usuarioId]);
  },

  actualizar: async (id, usuarioId, libro) => {
    const query = `
      UPDATE libros
      SET titulo = ?, autor = ?, estatus = ?, fecha_inicio = ?, fecha_fin = ?, comentario = ?
      WHERE id = ? AND usuario_id = ?
    `;
    const values = [
      libro.titulo,
      libro.autor,
      libro.estatus,
      libro.fecha_inicio || null,
      libro.fecha_fin || null,
      libro.comentario || null,
      id,
      usuarioId
    ];
    return db.query(query, values);
  },

  eliminar: async (id, usuarioId) => {
    const query = `DELETE FROM libros WHERE id = ? AND usuario_id = ?`;
    return db.query(query, [id, usuarioId]);
  }
};

module.exports = Libro;
