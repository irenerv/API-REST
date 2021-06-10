'use strict'

//Paquetes
const { firebaseApp } = require("../database/firebase");
const firebase = require("firebase");
require("firebase/storage");
require("firebase/firestore");
const { reauthenticate } = require("../database/reauthenticate");
const db = firebase.firestore(firebaseApp);


//Función que actualiza email
function putEmail(req, res) {
    firebase
        .auth()
        .currentUser.updateEmail(req.body.email)
        .then(() => {
            res.status(200).send({ updated: "success" })
        }).catch(() => {
            res.status(500).send({ message: `Error al actualizar: ${err}` })
        });
}

//Función que actualiza password
function putPassword(req, res) {
    reauthenticate(req.body.oldPassword)
        .then(async () => {
            await firebase
                .auth()
                .currentUser.updatePassword(req.body.newPassword)
                .then(() => {
                    firebase.auth().signOut();
                }).catch(() => {
                    res.status(500).send(
                        errorsTemp = {
                            other: "Error al actualizar la contraseña",
                        });
                })
        }).catch(() => {
            res.status(500).send(
                errorsTemp = {
                    password: "La contraseña no es correcta",
                });
        });
}

//Función que actualiza nombre
function putName(req, res) {
    const update = {
        displayName: req.body.newDisplayName
    }
    firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
            res.status(200).send({ updated: "success" })
        }).catch((err) => {
            res.status(500).send({ message: `Error al actualizar: ${err}` })

        })

}
//Función que actualiza avatar
function putAvatar(req, res) {
    () => (async (uri) => {

        const response = await fetch(req.body.uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`req.body.uid`);
        return ref.put(blob);
    }).then(() => {
        firebase.storage()
            .ref(`avatar/${req.body.uid}`)
            .getDownloadURL()
            .then(async (response) => {
                const update = {
                    photoURL: response,
                };
                await firebase.auth().currentUser.updateProfile(update);

            }).catch((err) => {
                res.status(500).send({ message: `Error al actualizar: ${err}` })
            });
    }).catch((err) => {
        res.status(500).send({ message: `Error al actualizar: ${err}` })

    })
}


//Exportación de contenido
module.exports = {
    putEmail,
    putAvatar,
    putPassword,
    putName
}
