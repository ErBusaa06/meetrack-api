const db = require('../config/db');

async function crearReunion(dni_alumno, id_disponibilidad) {
    const connection = await db.getConnection(); // Pedimos una conexión dedicada para hacer varias cosas seguidas

    try {
        await connection.beginTransaction(); // Iniciamos "modo seguro" (Transacción)

        // 1. Obtener datos de la disponibilidad (fecha, hora, profesor)
        const [rows] = await connection.execute(
            'SELECT * FROM DISPONIBILIDAD WHERE id_disponibilidad = ? AND estado = "libre"',
            [id_disponibilidad]
        );

        if (rows.length === 0) {
            throw new Error('DISPONIBILIDAD_NO_VALIDA'); // O no existe o ya está ocupada
        }

        const disp = rows[0]; // Datos del hueco (fecha, hora, id_profesor)

        // 2. Crear la Reunión
        const id_reunion = 'reunion_' + Date.now();
        await connection.execute(
            'INSERT INTO REUNION (id_reunion, fecha, hora, estado, dni_alumno, dni_profesor) VALUES (?, ?, ?, ?, ?, ?)',
            [id_reunion, disp.fecha, disp.hora, 'pendiente', dni_alumno, disp.id_profesor]
        );

        // 3. Marcar Disponibilidad como OCUPADA
        await connection.execute(
            'UPDATE DISPONIBILIDAD SET estado = "ocupada" WHERE id_disponibilidad = ?',
            [id_disponibilidad]
        );

        await connection.commit(); // Confirmamos los cambios
        return { message: 'Reunión reservada con éxito', id_reunion };

    } catch (error) {
        await connection.rollback(); // Si algo falla, deshacemos todo
        throw error;
    } finally {
        connection.release(); // Soltamos la conexión
    }
}

// Listar reuniones de un alumno
async function obtenerPorAlumno(dni_alumno) {
    const [rows] = await db.execute('SELECT * FROM REUNION WHERE dni_alumno = ?', [dni_alumno]);
    return rows;
}

// Listar reuniones de un profesor
async function obtenerPorProfesor(dni_profesor) {
    const [rows] = await db.execute('SELECT * FROM REUNION WHERE dni_profesor = ?', [dni_profesor]);
    return rows;
}

module.exports = { crearReunion, obtenerPorAlumno, obtenerPorProfesor };