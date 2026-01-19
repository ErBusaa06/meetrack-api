const express = require('express');
const router = express.Router();
const disponibilidadController = require('../controllers/disponibilidadController');

// POST http://localhost:3000/api/disponibilidad
router.post('/', disponibilidadController.crear);

// GET http://localhost:3000/api/disponibilidad/profesor/:id_profesor
// Ejemplo: GET .../profesor/99999999R
router.get('/profesor/:id_profesor', disponibilidadController.listarPorProfesor);

module.exports = router;