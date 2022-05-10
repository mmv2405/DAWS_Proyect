const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');


//Class of Users 
const User = new Schema({
    name: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    date:{type:Date, default:Date.now },
    user:{type: String}
})

//Password encryption 
User.methods.encryptPassword= async (password) =>{
    const firstHash = await bcrypt.genSalt(10);
    const hashpswd =bcrypt.hash(password, firstHash);
     return hashpswd;
};
//Compare password 
User.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', User);