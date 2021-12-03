const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: String,
  email: String,
  password: String,
  rol: String,
  eliminado: Boolean
});

const User = mongoose.model("usuarios", userSchema);

function getUsers(){
    return User.find({eliminado:false});
}

function getUserByEmail(emailU){
    return User.findOne({email:emailU});
}

async function addUser(data){
    const nuevoU = {
        nombre: data.nombre,
        password: data.password,
        email:data.email,
        rol: data.rol,
        eliminado:false
    }

    let nuevoUser = await User.create(nuevoU);
    return nuevoUser;
}

async function updateUserById(idU, data)
{
    let userUpdate = await User.findOneAndUpdate({id:idU},data, {
        new: true
      });
      return userUpdate;
}

async function softDeleteUser(idU)
{
    let userdelete = await User.findOneAndUpdate({id:idU},{eliminado:true}, {
        new: true
      });
      return userdelete;
}

async function restoreUser(idU)
{
    let userdelete = await User.findOneAndUpdate({id:idU},{eliminado:false}, {
        new: true
      });
      return userdelete;
}

async function deleteUserById(idU){
        await User.deleteOne({id:idU})
}


module.exports = {getUsers, getUserByEmail, addUser, updateUserById, deleteUserById, softDeleteUser, restoreUser}
