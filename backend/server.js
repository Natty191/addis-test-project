const express = require("express");
const userRouter = require("./routes/user");
const songRouter = require("./routes/song");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

dotenv.config();

const PORT = 4000;

// connecting to the database
connectDB();

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
