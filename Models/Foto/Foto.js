const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fotoSchema = new Schema({
  titulo: String,
  descripcion: String,
  url: String,
  album_id: String,
  eliminado: Boolean
});

const Foto = mongoose.model("fotos", fotoSchema);

function getFotos(){
    return Foto.find({eliminado:false});
}

function getFotosByAlbum(albumId){
    return Foto.find({album_id:albumID});
}

async function addFoto(data){
    const nuevaF= {
        titulo: data.titulo,
        descripcion: data.descripcion,
        url: data.url,
        album_id: data.album_id,
        eliminado: false
    }

    let nuevaFoto = await Foto.create(nuevaF);
    return nuevaFoto;
}

async function updateFotoById(idF, data)
{
    let fotoUpdate = await Foto.findOneAndUpdate({id:idF},data, {
        new: true
      });
      return fotoUpdate;
}

async function softDeleteFoto(idF)
{
    let fotodelete = await Foto.findOneAndUpdate({id:idF},{eliminado:true}, {
        new: true
      });
      return fotodelete;
}

async function restoreFoto(idF)
{
    let fotodelete = await Foto.findOneAndUpdate({id:idF},{eliminado:false}, {
        new: true
      });
      return fotodelete;
}

async function deleteFotoById(idF){
        await Foto.deleteOne({id:idF})
}


module.exports = {getFotos, getFotosByAlbum, addFoto, updateFotoById, deleteFotoById, softDeleteFoto, restoreFoto}