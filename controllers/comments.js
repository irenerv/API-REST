'use strict'
//Paquetes
const { firebaseApp } = require("../database/firebase");
const firebase = require("firebase/app");
require("firebase/storage");
require("firebase/firestore");
const db = firebase.firestore(firebaseApp);


//Funciones de las rutas que utilizan la informacion de la colección "comments"


//Guardar datos
function saveComments(req, res) {
    db.collection("comments")
        .add(req.body.payload)
        .then(() => {
            res.status(200).send({ comment: "commentStored" })
        }).catch((err) => {
            res.status(500).send({ message: `Error : ${err}` })

        });
}

//Conseguir los comments
function getComments(req, res) {
    db.collection("comments")
        .where("idPost", "==", req.body.idPost)
        .get()
        .then((response) => {
            const resultComments = [];
            response.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                resultComments.push(data);
            });
            res.status(200).send({ comments: resultComments })
        }).catch((err) => {
            res.status(500).send({ message: `Error : ${err}` })

        });

}

//Exportación de contenido
module.exports = {
    saveComments,
    getComments
}