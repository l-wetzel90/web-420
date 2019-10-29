var User = require('../models/user');

//register a new user on post
exports.user_register = function (req, res) {
    res.send('\nNOT IMPLEMENTED: User registration POST\n');
};

//verify token on GET
exports.user_token = function (req, res) {
    res.send('\nNOT IMPLEMENTED: User token lookup GET\n');
};
