'use strict'

//Paquetes
const express = require('express');
const app = express();
const api = require('./routes');
const port = process.env.PORT || 3000

//No es necesario incluir body-parser para las versiones de express 4.16+
//as lineas body-árser se sustituirán por:
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use('/api', api);

//Servidor inicializado, corriendo y escuchando en el puerto 3000
app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`);
})


module.exports = app