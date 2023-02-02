const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

const { sequelize } = require("./lib/sequelize");
const { userRoutes, bookRoutes } = require("./routes");

sequelize.sync({ alter: true });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>BFI TEST</h1>");
});

app.use("/cover_url", express.static(`${__dirname}/public/cover`));
app.use(
  "/profile_images",
  express.static(`${__dirname}/public/profile-picture`)
);

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.listen(PORT, () => {
  console.log("Listening in port", PORT);
});
