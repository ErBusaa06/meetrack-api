const reunionesService = require('../services/reunionesService');

async function crear(req, res) {
    const { dni_alumno, id_disponibilidad } = req.body;

    if (!dni_alumno || !id_disponibilidad) {
        return res.status(400).json({ error: 'Faltan datos (dni_alumno, id_disponibilidad)' });
    }

    try {
        const resultado = await reunionesService.crearReunion(dni_alumno, id_disponibilidad);
        res.status(201).json(resultado);
    } catch (error) {
        if (error.message === 'DISPONIBILIDAD_NO_VALIDA') {
            res.status(409).json({ error: 'Ese hueco ya no está disponible o no existe' });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Error al reservar reunión' });
        }
    }
}

async function listarAlumno(req, res) {
    const { dni } = req.params;
    try {
        const lista = await reunionesService.obtenerPorAlumno(dni);
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: 'Error interno' });
    }
}

async function listarProfesor(req, res) {
    const { dni } = req.params;
    try {
        const lista = await reunionesService.obtenerPorProfesor(dni);
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: 'Error interno' });
    }
}

module.exports = { crear, listarAlumno, listarProfesor };