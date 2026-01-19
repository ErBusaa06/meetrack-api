const disponibilidadService = require('../services/disponibilidadService');

async function crear(req, res) {
    const { fecha, hora, id_profesor } = req.body;

    if (!fecha || !hora || !id_profesor) {
        return res.status(400).json({ error: 'Faltan datos (fecha, hora, id_profesor)' });
    }

    try {
        const resultado = await disponibilidadService.crearDisponibilidad(fecha, hora, id_profesor);
        res.status(201).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear disponibilidad' });
    }
}

async function listarPorProfesor(req, res) {
    const { id_profesor } = req.params; // Lo leemos de la URL

    try {
        const lista = await disponibilidadService.obtenerPorProfesor(id_profesor);
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener disponibilidad' });
    }
}

module.exports = { crear, listarPorProfesor };