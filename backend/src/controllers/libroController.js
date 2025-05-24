const Libro = require('../models/libro.model');

exports.crearLibro = async (req, res) => {
  const usuario_id = req.userId;
  const { titulo, autor, estatus, fecha_inicio, fecha_fin, comentario } = req.body;

  if (!titulo || !autor || !estatus) {
    return res.status(400).json({ message: 'Campos obligatorios: título, autor, estatus' });
  }

  try {
    await Libro.crear({ usuario_id, titulo, autor, estatus, fecha_inicio, fecha_fin, comentario });
    res.status(201).json({ message: 'Libro agregado correctamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.obtenerLibros = async (req, res) => {
  try {
    const [rows] = await Libro.obtenerPorUsuario(req.userId);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.obtenerLibroPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await Libro.obtenerPorId(id, req.userId);
    if (rows.length === 0) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.actualizarLibro = async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, estatus, fecha_inicio, fecha_fin, comentario } = req.body;

  try {
    await Libro.actualizar(id, req.userId, { titulo, autor, estatus, fecha_inicio, fecha_fin, comentario });
    res.json({ message: 'Libro actualizado' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.eliminarLibro = async (req, res) => {
  const { id } = req.params;

  try {
    await Libro.eliminar(id, req.userId);
    res.json({ message: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

