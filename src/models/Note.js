const mongoose = require('mongoose');
const {Schema} = mongoose;

//Class of note 
const Note = new Schema({
    title: { type: String, required: true},
    description: {type: String, required: true},
    date:{type:Date, default:Date.now },
    name:{type: String}
})

module.exports = mongoose.model('Note', Note);