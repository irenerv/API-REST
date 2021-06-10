'use strict'

//Paquetes
const { firebaseApp } = require("../database/firebase");
const firebase = require("firebase");
require("firebase/storage");
require("firebase/firestore");


//Funciones de las rutas de autenticación 

//Iniciar sesión
function signIn(req, res) {
    try {
        firebase
            .auth()
            .signInWithEmailAndPassword(req.body.email, req.body.password)
        res.status(200).send({ status: "completed" })
    } catch (err) {
        res.status(404).send({ message: `Error : ${err}` })

    };
}


//Registrar
function signUp(req, res) {
    try {
        firebase
            .auth()
            .createUserWithEmailAndPassword(req.body.email, req.body.password)
        res.status(200).send({ status: "completed" })
    } catch (err) {
        res.status(500).send({ message: `Error : ${err}` })

    };
}

//Cierre de sesión
function signOut(req, res) {
    try {
        firebase.auth().signOut()
        res.status(200).send({ status: "completed" })
    } catch (err) {
        res.status(500).send({ message: `Error : ${err}` })

    };
}

//Exportación de contenido
module.exports = {
    signIn,
    signUp,
    signOut
}