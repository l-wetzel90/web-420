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
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// define the user schema

var userSchema = new Schema({
    username: String,
    password: String,
    email: String
});

//define user model
var User = mongoose.model("User", userSchema);

// make the userSchema accessible
module.exports = User;

//user.save is used to add a new user in database
module.exports.add = (user, callback) => {
    user.save(callback);
};

module.exports.getById = (id, callback) => {
    var query = { _id: id };
    User.findById(query, callback);
};