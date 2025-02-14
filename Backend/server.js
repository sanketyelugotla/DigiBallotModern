const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const { auth, candidate, temp, party } = require("./routes/routes.index.js")
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// Routes
app.use("/auth", auth);
app.use("/candidates", candidate)
app.use("/party", party)
// app.use("/temp", temp)

app.get("/", (req, res) => {
    res.send("Voting System API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
