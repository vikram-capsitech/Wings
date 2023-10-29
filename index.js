const express = require("express");

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Hello its Vikram Backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
