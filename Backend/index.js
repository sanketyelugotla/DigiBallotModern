const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const { auth, candidate, party, admin, election, voter, image } = require("./routes/index.js");
const authenticate = require("./middleware/authenticate.js");
const authenticateCandidate = require("./middleware/authenticateCandidate.js");
const authenticateAdmin = require("./middleware/authenticateAdmin.js");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
const corsOptions = {
    origin: ['http://localhost:5173', 'https://digi-ballot.vercel.app'],  // Add both local and deployed URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Allow cookies to be sent along with requests (if needed)
};

app.use(cors(corsOptions));

// Connect Database
connectDB();

app.get("/", (req, res) => {
    res.send("Voting System API is running...");
});

// Routes
app.use("/auth", auth);
app.use("/image", image);
app.use(authenticate);
app.use("/voter", voter)
app.use("/party", party)
app.use("/election", election)
// app.use(authenticateCandidate)
app.use("/candidates", candidate)
// app.use(authenticateAdmin)
app.use("/admin", admin)
// app.use("/temp", temp)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));