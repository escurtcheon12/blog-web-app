const express = require("express");
let bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv");
const con = require("./config/db");
env.config();
const app = express();
const path = require("path");

const blogsRouter = require("./routes/blogsRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const viewersRouter = require("./routes/viewersRouter");
const commentsRouter = require("./routes/commentsRouter");

app.use((req, res, next) => {
  req.con = con;
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use(express.json());
app.use("/blogs", blogsRouter);
app.use("/categories", categoriesRouter);
app.use("/viewers", viewersRouter);
app.use("/comments", commentsRouter);

app.listen(process.env.PORT, () => {
  console.log(`app running in http://localhost:${process.env.PORT} `);
});
