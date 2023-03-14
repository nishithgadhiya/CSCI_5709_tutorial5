const express = require("express");

const app = express();
const routes = require("./route");

app.use(express.json());
app.use(routes);

// handle 404 error
app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

module.exports = app;
