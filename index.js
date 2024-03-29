const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;

const bodyParser = require("body-parser");
const { generateResponse } = require("./controllers/index.js");

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/generate", generateResponse);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});