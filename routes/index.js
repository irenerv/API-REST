'use strict'

//Paquetes
const express = require('express');
const Comments = require('../controllers/comments');
const Post = require('../controllers/post');
const UserAuth = require('../controllers/userAuth');
const UserState = require('../controllers/userState');
const UserUp = require('../controllers/userUpdates');
const api = express.Router();


//Rutas
// get:obtención de datos
// post: login, sign up, save
// put: actualizar datos
// delete: eliminar datos

//Rutas para trabajar con la autenticación del usuario

api.post('/signup', UserAuth.signUp);

api.post('/signin', UserAuth.signIn);

api.post('/signout', UserAuth.signOut);

//Rutas para actualizar datos del usuario

api.put('/putEmail', UserUp.putEmail);

api.put('/putAvatar', UserUp.putAvatar);

api.put('/putPassword', UserUp.putPassword);

api.put('/putName', UserUp.putName);

//Rutas para trabajar la información de estado de autenticación

api.get('/init', UserState.getInit);

api.get('/state', UserState.getState);

//Rutas para trabajar la información de la colección "post"

api.post('/post', Post.savePost);

api.get('/post/:limitPost', Post.getPosts);

api.get('/postLen', Post.getLen);

api.get('/postInfo/:id', Post.getPostInfo);

api.post('/postImage', Post.postImage);

api.delete('/postInfo/:id', Post.deletePost);

//Rutas para trabajar la información de la colección "comment"

api.post('/comment', Comments.saveComments);

api.get('/comment/:idPost', Comments.getComments);


module.exports = api;