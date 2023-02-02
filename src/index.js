const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

const { sequelize } = require("./lib/sequelize");
const { userRoutes } = require("./routes");

sequelize.sync({ alter: true });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>BFI TEST</h1>");
});

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log("Listening in port", PORT);
});
