const express = require("express");
const userRouter = require("./routes/user");
const songRouter = require("./routes/song");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const PORT = 4000;

// connecting to the database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/user", userRouter);
app.use("/api/songs", songRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
