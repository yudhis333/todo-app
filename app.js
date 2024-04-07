const express = require("express");
const app = express();
const port = 4000;
const router = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Izinkan origin dari frontend di localhost:3000
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Izinkan pengiriman cookie lintas domain
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));  

app.use("/api/v1", router);

app.use((req, res, next) => {
  try {
    throw { name: "notFoundEndpoin" };
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

if (process.env.NODE_ENV != "test") {
  app.listen(port, () => {
    console.log("berjalan di port " + port);
  });
}

module.exports = app;
