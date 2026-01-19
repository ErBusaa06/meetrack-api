const db = require('../config/db');

async function crearActa(contenido, id_alumno, id_profesor, ruta_archivo) {
    const id_acta = 'acta_' + Date.now();
    const fecha_creacion = new Date();
    const estado = 'publicada';

    try {
        await db.execute(
            'INSERT INTO ACTA (id_acta, contenido, fecha_creacion, estado, id_alumno, id_profesor, ruta_archivo) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id_acta, contenido, fecha_creacion, estado, id_alumno, id_profesor, ruta_archivo]
        );
        return { message: 'Acta subida correctamente', id_acta, url: ruta_archivo };
    } catch (error) {
        throw error;
    }
}

// Listar actas de un alumno
async function obtenerPorAlumno(id_alumno) {
    const [rows] = await db.execute('SELECT * FROM ACTA WHERE id_alumno = ?', [id_alumno]);
    return rows;
}

module.exports = { crearActa, obtenerPorAlumno };