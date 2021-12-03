const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const albumSchema = new Schema({
  titulo: String,
  cuerpo: String,
  portada: String,
  fechaCreacion: Date,
  user_id:String,
  eliminado: Boolean
});

const Album = mongoose.model("albumes", albumSchema);

function getAlbumes(){
    return Album.find({eliminado:false});
}

function getTrashedAlbumes(){
    return Album.find({eliminado:true});
}

function getAllAlbumes(){
    return Album.find();
}

function getAlbumsByUserId(idU){
    return Album.find({user_id:idU});
}

async function addAbum(data){
    const newAlbum = {
        titulo: data.titulo,
        cuerpo: data.cuerpo,
        portada: data.portada,
        fechaCreacion: data.fechaCreacion,
        user_id:data.user_id,
        eliminado: false
    }

    let nuevoAlbum = await Album.create(nuevoU);
    return nuevoAlbum;
}

async function updateAlbumById(idA, data)
{
    let albumUpdate = await Album.findOneAndUpdate({id:idA},data, {
        new: true
      });
      return albumUpdate;
}

async function softDeleteAlbumById(idA){
    await Album.findOneAndUpdate({id:idA},{eliminar:true})
}
async function restoreAlbumById(idA){
    await Album.findOneAndUpdate({id:idA},{eliminar:false})
}
async function deleteAlbumById(idA){
        await Album.deleteOne({id:idA})
}

module.exports = {getAlbumes, getAlbumsByUserId, getTrashedAlbumes, getAllAlbumes, updateAlbumById, deleteAlbumById, softDeleteAlbumById, restoreAlbumById, addAbum}