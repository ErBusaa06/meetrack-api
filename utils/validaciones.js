function esDniValido(dni) {
    if (!dni) return false;
    let dniLimpio = dni.toUpperCase().trim();
    if (!/^[0-9]{8}[A-Z]$/.test(dniLimpio)) return false;
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    return dniLimpio[8] === letras[parseInt(dniLimpio) % 23];
}
module.exports = { esDniValido };