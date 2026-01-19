const authService = require('../services/authService');

async function login(req, res) {
    const { dni, password } = req.body;

    try {
        const resultado = await authService.loginUsuario(dni, password);
        res.json(resultado);
    } catch (error) {
        if (error.message === 'CREDENCIALES_INVALIDAS') {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        } else {
            res.status(500).json({ error: 'Error interno' });
        }
    }
}

module.exports = { login };