const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");

//Handling Uncaught Exception Error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the sever due to uncaught exception`);
  process.exit(1);
});

//config
dotenv.config({ path: "./config/.env" });

//connecting to database
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to unhandled  promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
