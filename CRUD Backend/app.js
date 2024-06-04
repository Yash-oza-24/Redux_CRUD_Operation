require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const morgan = require("morgan");
app.use(morgan("dev"));

const PORT = process.env.PORT || 4888;

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productsRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, server Connected");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Connect to MongoDB and start the server
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

start();
