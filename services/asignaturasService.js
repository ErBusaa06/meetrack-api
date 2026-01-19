const db = require('../config/db');

// Obtener todas las asignaturas
async function obtenerTodas() {
    const [rows] = await db.execute('SELECT * FROM ASIGNATURA');
    return rows;
}

// Crear una nueva asignatura
async function crearAsignatura(id, nombre, descripcion) {
    try {
        await db.execute(
            'INSERT INTO ASIGNATURA (id_asignatura, nombre, descripcion) VALUES (?, ?, ?)',
            [id, nombre, descripcion]
        );
        return { message: 'Asignatura creada correctamente' };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('DUPLICADO');
        }
        throw error;
    }
}

module.exports = { obtenerTodas, crearAsignatura };