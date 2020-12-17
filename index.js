const express = require("express");

const Twig = require("twig");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render('index.twig', {
    message : "Hello World"
  });
});

app.get("/coucou", (req, res) => {
  res.send("Orange!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

process.stdout.write("Hello world");
