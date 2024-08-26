const express = require("express");
const userRouter = require("./routes/user");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const PORT = 4000;

// connecting to the database
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/user", userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
