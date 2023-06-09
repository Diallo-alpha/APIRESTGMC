const mongoose = require('mongoose')
//schema d'utilisateur
const userSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    passworld:{type: Number, required: true}
})
//exporter 
const User = mongoose.model('User', userSchema)
module.exports = User