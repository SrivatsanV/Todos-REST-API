const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const postRouter = require("./routes/posts");

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Routes
app.use("/todos", postRouter);

app.get("/", (req, res) => {
  res.send("Index");
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("db connected");
});

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
