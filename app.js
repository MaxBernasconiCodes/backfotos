const express = require('express');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const port = 4500;

const {getAlbumes, getAlbumsByUserId, getTrashedAlbumes, getAllAlbumes, updateAlbumById, deleteAlbumById, softDeleteAlbumById, restoreAlbumById, addAbum} = require("./Models/Album/Album");

const {getUsers, getUserByEmail, addUser, updateUserById, deleteUserById, softDeleteUser, restoreUser} = require("./Models/User/User");

const {getFotos, getFotosByAlbum, addFoto, updateFotoById, deleteFotoById, softDeleteFoto, restoreFoto} = require("./Models/Foto/Foto")


mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000');

//Rutas Autoraciones
app.post('/login', (req, res) =>{
    const {email, password} = req;
    if(email && password && typeof email == String && typeof password == String)
    {
        let uLogin = getUserByEmail(email);
        let pasa = bcrypt.compare(email, uLogin.password)
        console.log(pasa);
        let respuesta = uLogin;
        delete respuesta.password;
        respuesta.token = respuesta.email;
        respuesta.token += new Date;
        respuesta.token = bcrypt.hash(respuesta.token);
        if(pasa){
            res.status(200).send(respuesta)
        }
        else{
            res.status(400).send({message:"Email o Contraseña incorrectos"})
        }
    }
    else{
        res.status(400).send({message:"datos enviados insuficientes"})
    }
})

app.post('/usuario', (req, res) =>{
    const {nombre, email, password, rol} = req;
    password = bcrypt.hash(password, 8);
    let data = {nombre, email, password, rol};
    let nuevoU = addUsuario(data);
    res.send(nuevoU);
})

//Rutas Usuario


//Rutas Album
app.get('/album/all', (req, res) =>{
    let albumes = getAllAlbumes();
    res.send(albumes)
})

//Rutas Fotos

app.listen(port, () => console.log('Servidor andando en puerto: ' + port ));