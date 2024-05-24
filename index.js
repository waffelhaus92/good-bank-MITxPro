var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("./authMid.js");

// used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());

// create user account
app.get("/account/create/:name/:email/:password", function (req, res) {
  // check if account exists
  dal.find(req.params.email).then((users) => {
    // if user exists, return error message
    if (users.length > 0) {
      console.log("User already in exists");
      res.send("User already in exists");
    } else {
      //Generate random salt
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.error("Error hashing password:", err);
          res.status(500).send("An error occured");
          return;
        }
        bcrypt.hash(req.params.password, salt, (err, hashedPassword) => {
          if (err) {
            console.error("Error hashing password:", err);
            res.status(500).send("An error occured");
            return;
          }
          //creates user with a hashed password.
          dal
            .create(req.params.name, req.params.email, hashedPassword)
            .then((user) => {
              console.log(user);
              res.send(user);
            });
        });
      });
    }
  });
});

// login user
app.get("/account/login/:email/:password", function (req, res) {
  dal
    .find(req.params.email)
    .then((user) => {
      if (user.length > 0) {
        if (user.length === 0) {
          return res.status(401).send("Login failed: Invalid credentials.");
        }

        // Compares hashed password instead of plain text
        bcrypt.compare(
          req.params.password,
          user[0].password,
          (err, isMatch) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              res.status(500).send("An error occurred");
              return;
            }

            if (isMatch) {
              const token = generateToken({ email: req.params.email });
              res.json({ user: user[0], token }); // Send user and token upon successful login
            } else {
              res.status(401).send("Login failed: wrong password");
            }
          }
        );
      } else {
        res.status(404).send("Login failed: user not found");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("An error occurred while logging in");
    });
});

// find user account
app.get("/account/find/:email", verifyToken, function (req, res) {
  dal.findById(req.userId).then((user) => {
    if (user) {
      res.send(user);
    }else {
      res.status(404).send("User not found.")
    }
  });
});

// find one user by email 
app.get("/account/findOne/:email", verifyToken, function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update - deposit/withdraw amount
app.get("/account/update/:email/:amount", verifyToken, function (req, res) {
  var amount = Number(req.params.amount);

  dal.update(req.params.email, amount).then((response) => {
    console.log(response);
    res.send(response);
  });
});

// all accounts
app.get("/account/all", verifyToken, function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

var port = 3000;
app.listen(port);
console.log("Running on port: " + port);
