const express = require("express");

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/coucou", (req, res) => {
  res.send("Coucou World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

process.stdout.write("Hello world");
