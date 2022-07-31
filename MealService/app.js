#!/usr/bin nodejs
const http = require("http");
const express = require("express");
const session = require("express-session");
const path = require("path");
const morgan = require("morgan");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();
const port = process.env.PORT || 8015;

// View Engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// Body parser
app.use(bodyParser.json());

// Logger
app.use(morgan("tiny"));

// Session
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    path: "/",
    httpOnly: true,
    secure: false,
    maxAge: null,
    secret: "session",
    resave: false,
    saveUninitialized: false,
  })
);

// Routers
app.use("/meal", require("./routes/meal"));

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log(`Connected to DB`))
  .catch((e) => console.log(e));

// Minimal error Handler
app.use((err, req, res, next) => {
  res.status(500).send("Server error");
});
const server = app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});

server.on("connection", (socket) => {
  console.log("New Connection...");
});
