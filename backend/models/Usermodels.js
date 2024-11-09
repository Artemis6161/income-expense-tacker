const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: {type: String},
    password: { type: String, required: true },
    gender: {
        type: String,    
      },
      birthday: {
        type: Date,      
      }
});



module.exports =  mongoose.model("User", userSchema)