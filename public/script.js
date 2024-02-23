document.getElementById('form-boleto').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    // Enviar los datos al servidor
    fetch('/comprar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            email: email,
            telefono: telefono
        })
    })
    .then(response => response.json())
    .then(data => {
        // Manejar la respuesta del servidor
        console.log(data);

        // Generar un número de boleto aleatorio de 4 cifras
        const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;

        // Mostrar el número de boleto generado en el HTML
        const numeroBoletoSpan = document.getElementById('numero-boleto');
        numeroBoletoSpan.textContent = numeroAleatorio;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
