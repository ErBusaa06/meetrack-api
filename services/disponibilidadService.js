const db = require('../config/db');

// Crear una nueva disponibilidad
async function crearDisponibilidad(fecha, hora, id_profesor) {
    // Generamos un ID único simple (ej: disp_1715620000)
    const id_disponibilidad = 'disp_' + Date.now();
    const estado = 'libre'; // Por defecto nace libre

    try {
        await db.execute(
            'INSERT INTO DISPONIBILIDAD (id_disponibilidad, fecha, hora, estado, id_profesor) VALUES (?, ?, ?, ?, ?)',
            [id_disponibilidad, fecha, hora, estado, id_profesor]
        );
        return { message: 'Disponibilidad creada', id: id_disponibilidad };
    } catch (error) {
        throw error;
    }
}

// Obtener disponibilidad de un profesor concreto
async function obtenerPorProfesor(id_profesor) {
    const [rows] = await db.execute(
        'SELECT * FROM DISPONIBILIDAD WHERE id_profesor = ?', 
        [id_profesor]
    );
    return rows;
}

module.exports = { crearDisponibilidad, obtenerPorProfesor };   