const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//////    import Router files    //////
const authRouter = require("../crudOPS/auth/authRouter");
const usersRouter = require("../crudOPS/users/usersRouter");
const recipesRouter = require("../crudOPS/recipes/recipesRouter");
const artworkRouter = require("../crudOPS/artwork/artworkRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//  pass this in cors if having bad cors issues

// {
//   origin: true,
//   credentials: true
// }

//////    Use routers    ///////
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/recipes", recipesRouter);
server.use("/api/artwork", artworkRouter);

//testing that the server works
server.get("/", (req, res) => {
  res.status(200).json({ status: "The Party Planner server is running!!" });
});

module.exports = server;
