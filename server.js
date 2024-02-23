const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware para analizar application/json
app.use(bodyParser.json());

// Configuración del transporte SMTP utilizando Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu-correo@gmail.com', // Tu dirección de correo electrónico de Gmail
        pass: 'tu-contraseña-de-app' // Tu contraseña de la aplicación (no la de tu cuenta principal)
    }
});

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para mostrar la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para procesar la solicitud de compra de boleto
app.post('/comprar', (req, res) => {
    // Obtén los datos del formulario
    const { nombre, email, telefono } = req.body;

    // Generar un número aleatorio de 4 cifras
    const numeroBoleto = Math.floor(1000 + Math.random() * 9000);

    // Opciones del correo electrónico
    const mailOptions = {
        from: 'tu-correo@gmail.com',
        to: email,
        subject: 'Número de Boleto',
        text: `Hola ${nombre}, tu número de boleto es: ${numeroBoleto}`
    };

    // Envío del correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
            res.status(500).json({ error: 'Error al enviar el correo electrónico' });
        } else {
            console.log('Correo electrónico enviado:', info.response);
            // Envía la respuesta al cliente
            res.json({ mensaje: 'Número de boleto enviado por correo electrónico', numeroBoleto });
        }
    });
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});