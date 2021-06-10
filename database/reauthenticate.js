const firebase = require("firebase");

//Función de reautenticación para realizar cambios en la información del usuario

function reauthenticate(password) {
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );
    return user.reauthenticateWithCredential(credentials);
}

module.exports = reauthenticate;