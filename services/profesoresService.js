const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { esDniValido } = require('../utils/validaciones');

async function crearProfesor(dni, nombre, apellidos, email, password) {
    // 1. Validar DNI
    if (!esDniValido(dni)) {
        throw new Error('DNI_INVALIDO');
    }

    // 2. Encriptar contraseña automáticamente
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.execute(
            'INSERT INTO PROFESOR (dni, nombre, apellidos, email, contrasenia_cifrada) VALUES (?, ?, ?, ?, ?)',
            [dni, nombre, apellidos, email, hashedPassword]
        );
        return { message: 'Profesor creado correctamente' };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('USUARIO_DUPLICADO');
        }
        throw error;
    }
}

module.exports = { crearProfesor };