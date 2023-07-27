const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require: true,
        unique:true,
    },
    password:{
        type:String,
        require: true,
        min:6,
    }
})

module.exports = mongoose.model('user', userModel)