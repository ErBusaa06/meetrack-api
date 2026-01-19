const express = require('express');
const router = express.Router();
const asignaturasController = require('../controllers/asignaturasController');

// GET http://localhost:3000/api/asignaturas
router.get('/', asignaturasController.listar);

// POST http://localhost:3000/api/asignaturas
router.post('/', asignaturasController.crear);

module.exports = router;