var User = require("../models/user");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config");

//register a new user on post
exports.user_register = function(req, res) {
  //create hash pw with bcrypt
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  //create user from schema to use in add query
  var newUser = new User({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email
  });

  //add user from method above to db
  User.add(newUser, (err, user) => {
    if (err)//if there was a problem adding throw err
      return res.status(500).send("There was a problem registering the user.");

      //otherwise create token for userid
    var token = jwt.sign({ id: user._id }, config.web.secret, {
      expiresIn: 86400 // 24 hours
    });

    //says that token and user are all good
    res.status(200).send({ auth: true, token: token });
  });
};

// Verify token on GET
exports.user_token = function(req, res) {
    
  User.getById(req.userId, function(err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");

    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);
  });
};

// User login request
exports.user_login = function(req, res) {
  User.getOne(req.body.email, function(err, user) {
    if (err) return res.status(500).send("Error on server.");
    if (!user) return res.status(404).send("No user found.");

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user._id }, config.web.secret, {
      expiresIn: 86400 //expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });
};

//User logout request
exports.user_logout = function(req, res) {
  res.status(200).send({ auth: false, token: null });
};
