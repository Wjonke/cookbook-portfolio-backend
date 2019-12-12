const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../../crudOPS/users/usersModel");
const validateRegisterInfo = require("../../middleware/verifyRegisterInfo");
const validateLoginInfo = require("../../middleware/verifyLoginInfo");

router.post("/register", validateRegisterInfo, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.insert(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res.status(500).json({
        error,
        message: "Username Must be Unique, please choose another"
      });
    });
});

router.post("/login", validateLoginInfo, (req, res) => {
  let { username, password } = req.body;

  Users.findBy(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error, message: "There was an error logging you in" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "7d"
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
