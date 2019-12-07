var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
    });
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// socket.emit('crearMensaje', {
//     mensaje: 'Hola Mundo'
// }, function(response) {
//     console.log(response);
// });

socket.on('crearMensaje', function(message) {
    console.log('Servidor:', message);
});

socket.on('listaPersona', function(personas) {
    console.log(personas);
});

//Mensajes privados

socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado:', mensaje);
});