module.exports = (req, res, next) => {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.first_name ||
    !req.body.last_name
  ) {
    res.status(400).json({
      error:
        "Make sure to enter the following data:  first_name, last_name, username, password"
    });
  } else {
    next();
  }
};
