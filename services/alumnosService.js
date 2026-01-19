const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { esDniValido } = require('../utils/validaciones');

async function crearAlumno(dni, nombre, email, password) {
    if (!esDniValido(dni)) throw new Error('DNI_INVALIDO');

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.execute(
            'INSERT INTO ALUMNO (dni, nombre, email, contrasenia_cifrada) VALUES (?, ?, ?, ?)',
            [dni, nombre, email, hashedPassword]
        );
        return { message: 'Alumno registrado correctamente' };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') throw new Error('USUARIO_DUPLICADO');
        throw error;
    }
}

module.exports = { crearAlumno };