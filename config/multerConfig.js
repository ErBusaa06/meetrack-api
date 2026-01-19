const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardan
    },
    filename: function (req, file, cb) {
        // Generamos un nombre único: acta-FECHA-NOMBREORIGINAL
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'acta-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro para aceptar solo PDFs (Opcional, pero recomendado)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos PDF'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;