const express = require('express');
const router = express.Router();
const actasController = require('../controllers/actasController');

// POST: Generar acta (Ya no necesita upload.single)
router.post('/', actasController.generar);

// GET: Ver actas
router.get('/alumno/:id_alumno', actasController.listar);

module.exports = router;