const asignaturasService = require('../services/asignaturasService');

async function listar(req, res) {
    try {
        const asignaturas = await asignaturasService.obtenerTodas();
        res.json(asignaturas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener asignaturas' });
    }
}

async function crear(req, res) {
    const { id, nombre, descripcion } = req.body;

    // Validación simple
    if (!id || !nombre) {
        return res.status(400).json({ error: 'Faltan datos (id, nombre)' });
    }

    try {
        const resultado = await asignaturasService.crearAsignatura(id, nombre, descripcion);
        res.status(201).json(resultado);
    } catch (error) {
        if (error.message === 'DUPLICADO') {
            res.status(409).json({ error: 'Ya existe una asignatura con ese ID' });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Error interno' });
        }
    }
}

module.exports = { listar, crear };