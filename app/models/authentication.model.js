const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: { type: String, required: true, unique: true },
   hashedPassword: { type: String, required: true },
});

const User = mongoose.model('User', userSchema, 'authentication'); // 'authentication' - имя коллекции в базе данных

module.exports = User;
