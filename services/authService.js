const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'super_secreto_escolar';

async function loginUsuario(dni, password) {
    console.log("---------------------------------------------------");
    console.log(`🔍 INTENTO LOGIN -> DNI: '${dni}' | PASS: '${password}'`);

    let user = null;
    let role = '';

    // 1. BUSCAR EN ALUMNO
    const [alumnos] = await db.execute('SELECT * FROM ALUMNO WHERE dni = ?', [dni]);
    if (alumnos.length > 0) {
        user = alumnos[0];
        role = 'alumno';
        console.log("✅ Encontrado en tabla ALUMNO");
    } else {
        console.log("❌ No está en tabla ALUMNO");
        
        // 2. BUSCAR EN PROFESOR
        const [profesores] = await db.execute('SELECT * FROM PROFESOR WHERE dni = ?', [dni]);
        if (profesores.length > 0) {
            user = profesores[0];
            role = 'profesor';
            console.log("✅ Encontrado en tabla PROFESOR");
        } else {
            console.log("❌ No está en tabla PROFESOR");
        }
    }

    // SI NO ENCUENTRA NADA
    if (!user) {
        console.log("⛔ ERROR: Usuario no encontrado en ninguna tabla.");
        throw new Error('CREDENCIALES_INVALIDAS');
    }

    // 3. COMPARAR CONTRASEÑA
    console.log(`🔐 Hash en DB: ${user.contrasenia_cifrada}`);
    const validPassword = await bcrypt.compare(password, user.contrasenia_cifrada);
    console.log(`🤔 ¿Coinciden la contraseña y el hash?: ${validPassword}`);

    if (!validPassword) {
        console.log("⛔ ERROR: La contraseña no coincide con el hash.");
        throw new Error('CREDENCIALES_INVALIDAS');
    }

    // 4. TOKEN
    const token = jwt.sign(
        { dni: user.dni, role: role, nombre: user.nombre },
        SECRET_KEY, 
        { expiresIn: '2h' }
    );

    console.log("🚀 LOGIN EXITOSO");
    return { message: `Bienvenido ${role}`, token, role };
}

module.exports = { loginUsuario };