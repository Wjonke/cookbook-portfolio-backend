module.exports = (req, res, next) => {
  if (!req.body.name || !req.body.user_id) {
    res.status(400).json({ error: "A user_id and name is required" });
  } else {
    next();
  }
};
