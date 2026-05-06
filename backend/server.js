const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Route import
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/api/expenses", expenseRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});