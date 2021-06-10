'use strict'

//Paquetes
const { firebaseApp } = require("../database/firebase");
const firebase = require("firebase/app");
require("firebase/storage");
require("firebase/firestore");

//Funciones de las rutas de estado de autenticación   

//Inicializar bd
function getInit(req, res) {
    try {
        let initializing = firebaseApp;
        if (initializing) initializing = false;
        res.status(200).send({ initializing: initializing })
    } catch (err) {
        res.status(500).send({ message: `Error : ${err}` })
    };
}

//Función para conocer el estado de autenticación, Loggeado/No loggeado

function getState(req, res) {
    try {
        const subscriber = firebase.auth().onAuthStateChanged();
        res.status(200).send({ subscriber: subscriber })
    } catch (err) {
        res.status(500).send({ message: `Error : ${err}` })
    };
}

//Exportación de paquetes
module.exports = {
    getInit,
    getState,
}