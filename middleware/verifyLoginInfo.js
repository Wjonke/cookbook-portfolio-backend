module.exports = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .json({ error: "Both a username and password are required for login" });
  } else {
    next();
  }
};
