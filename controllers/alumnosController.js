const alumnosService = require('../services/alumnosService');

async function registrar(req, res) {
    const { dni, nombre, email, password } = req.body;

    try {
        const resultado = await alumnosService.crearAlumno(dni, nombre, email, password);
        res.status(201).json(resultado);
    } catch (error) {
        if (error.message === 'DNI_INVALIDO') {
            res.status(400).json({ error: 'DNI inválido' });
        } else if (error.message === 'USUARIO_DUPLICADO') {
            res.status(409).json({ error: 'El usuario ya existe' });
        } else {
            res.status(500).json({ error: 'Error interno' });
        }
    }
}

module.exports = { registrar };