//Core modules
const path = require("path");

//External modules
const express = require("express");

const dir = __dirname;
const app = express();

app.use(express.static(path.join(dir, "public")));

app.use((req, res, next) => {
  res.sendFile(path.join(dir, "public", "views", "CanvasTest.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});

module.exports.dir = __dirname;
