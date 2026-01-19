const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnosController');

router.post('/register', alumnosController.registrar);

module.exports = router;