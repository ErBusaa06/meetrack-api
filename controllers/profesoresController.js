const profesoresService = require('../services/profesoresService');

async function registrar(req, res) {
    const { dni, nombre, apellidos, email, password } = req.body;

    try {
        const resultado = await profesoresService.crearProfesor(dni, nombre, apellidos, email, password);
        res.status(201).json(resultado);
    } catch (error) {
        if (error.message === 'DNI_INVALIDO') {
            res.status(400).json({ error: 'DNI inválido' });
        } else if (error.message === 'USUARIO_DUPLICADO') {
            res.status(409).json({ error: 'Ya existe un profesor con ese DNI' });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Error interno' });
        }
    }
}

module.exports = { registrar };