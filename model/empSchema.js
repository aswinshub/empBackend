const mongoose = require('mongoose');
const empSchema = mongoose.Schema({
    name:String,
    position:String,
    location:String,
    email:String,
    password:String
})

const Data=mongoose.model('empdatas',empSchema)
module.exports = Data;

