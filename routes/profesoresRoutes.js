const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');

// POST http://localhost:3000/api/profesores/register
router.post('/register', profesoresController.registrar);

module.exports = router;