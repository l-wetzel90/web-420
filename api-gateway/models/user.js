/*
============================================
; Title:  user.js
; Author: Loren Wetzel
; Modified By:
; Date:   28 October 2019
; Description: setup mongoose schema/model
;===========================================
*/

//variable/required
var mongoose = require('mongoose');


// define the user schema
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});


const User = module.exports = mongoose.model('User', userSchema);

//database queries

// user.save is used to add a new user in our database
module.exports.add = (user, callback) => {
    user.save(callback);
};

module.exports.getById = (id, callback) => {
    var query = { _id: id };
    User.findById(query, callback);
};

module.exports.getOne = (e, callback) => {
    var query = { email: e };
    User.findOne(query, callback);
};