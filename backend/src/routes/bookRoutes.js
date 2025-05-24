const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');
const auth = require('../middlewares/authMiddleware');

// Rutas protegidas
router.post('/', auth, libroController.crearLibro);
router.get('/', auth, libroController.obtenerLibros);
router.get('/:id', auth, libroController.obtenerLibroPorId);
router.put('/:id', auth, libroController.actualizarLibro);
router.delete('/:id', auth, libroController.eliminarLibro);

module.exports = router;

