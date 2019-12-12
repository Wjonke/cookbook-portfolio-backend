const server = require("./server/server.js");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

////setting up environmental variables////
dotenv.config({ path: "./database/db.config.js" });

if (process.env.NODE_ENV === "development") {
  server.use(morgan("dev"));
}

const PORT = process.env.PORT || 4000;

const app = server.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);

//handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  //close server and exit process
  app.close(() => process.exit(1));
});
