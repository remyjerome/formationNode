const express = require("express");

const Twig = require("twig");

const app = express();

app.get("/", (req, res) => {
  res.render("home.twig", {
    message: "Hello world"
  });
});

app.get("/coucou", (req, res) => {
  res.send("Orange!");
});

module.exports = app;
