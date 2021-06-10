'use strict'

//Paquetes
const { firebaseApp } = require("../database/firebase");
const firebase = require("firebase/app");
require("firebase/storage");
require("firebase/firestore");
const db = firebase.firestore(firebaseApp);
const { map } = require("lodash");
var uuid = require('random-uuid-v4');
var uuidv4 = uuid();

//Funciones de las rutas que utilizan la informacion de la colección "post"

//Almacenamiento y registro de posts
function savePost(req, res) {

    db.collection("post")
        .add({
            postHeader: req.body.postHeader,
            description: req.body.description,
            images: req.body.images,
            date: req.body.date,
            address: req.body.address,
            location: req.body.location,
            createAt: req.body.createAt,
            createBy: req.body.createBy,
        })
        .then(() => {
            res.status(200).send({ comment: "commentStored" })
        }).catch((err) => {
            res.status(500).send({ message: `Error al registrar post: ${err}` })

        })

}


//Almacenamiento de imágenes del post
function postImage(req, res) {

    try {
        async () => {
            const imageBlob = null;
            const ref = firebase.storage().ref("post").child(uuidv4);
            await ref.put(req.body.blob).then(async (result) => {
                await firebase
                    .storage()
                    .ref(`post/${result.metadata.name}`)
                    .getDownloadURL()
                    .then(async (photoUrl) => {
                        await imageBlob.push(photoUrl);

                    });
            }).then(() => {
                res.status(200).send({ imageBlob: imageBlob })
            }).catch((err) => {
                res.status(500).send({ message: `Error al registrar post: ${err}` })
            })
        }

    } catch {
        res.status(500).send({ message: `Error al registrar post: ${err}` })
    }

}

//Conocer la cantidad total de post
function getLen(req, res) {
    db.collection("post")
        .get()
        .then((snap) => {
            res.status(200).send({ lenght: snap.size })
        }).catch((err) => {
            res.status(500).send({ message: `Error : ${err}` })
        })
}

//Obtención de posts, para cargarlos en las listas de mostrar los datos
function getPosts(req, res) {
    let startPost = {};
    const resultPost = [];
    db.collection("post")
        .orderBy("createAt", "desc")
        .limit(req.params.limitPost)
        .get()
        .then((response) => {
            //Obtaining the file number to continue
            //setStartPost(response.docs[response.docs.length - 1])
            if (response.docs.length > 0) {
                startPost = response.docs[response.docs.length - 1];
            }
            //Obtaining every post in the database
            response.forEach((doc) => {
                const posts = doc.data();
                posts.id = doc.id;
                resultPost.push(posts);
            });
            //Storing data of every post in an array
            res.status(200).send({ posts: resultPost, startPost: startPost, })
        }).catch((err) => {
            res.status(500).send({ message: `Error : ${err}` })

        });
}

//Conseguir la información de cada post
function getPostInfo(req, res) {
    db.collection("post")
        .doc(req.params.id)
        .get()
        .then((response) => {
            const data = response.data();
            data.id = response.id;
            res.status(200).send({ data: data })
        }).catch((err) => {
            res.status(500).send({ message: `Error : ${err}` })

        });
}

function deletePost(req, res) {
    db.collection("post").doc(req.params.id).delete()
}

//Exportación de contenido
module.exports = {
    savePost,
    getPosts,
    getLen,
    getPostInfo,
    postImage,
    deletePost

}