const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const { auth, candidate, party, admin, election, voter, image } = require("./routes/index.js");
const authenticate = require("./middleware/authenticate.js");
const authenticateCandidate = require("./middleware/authenticateCandidate.js");
const authenticateAdmin = require("./middleware/authenticateAdmin.js");
require("dotenv").config();

const app = express();

// Custom CORS Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log('CORS headers set for:', req.method);
    next();
});

// CORS Options (Optional if you want specific origin control)
const corsOptions = {
    origin: ['http://localhost:5173', 'https://digi-ballot.vercel.app'],  // Add both local and deployed URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Allow cookies to be sent along with requests (if needed)
};

// Apply CORS Middleware (Optional, if using specific origins)
app.use(cors(corsOptions));

// Explicitly handle preflight requests (OPTIONS)
app.options('*', cors(corsOptions));  // Handle preflight for all routes

// Middleware to parse JSON data
app.use(express.json());

// Connect to Database
connectDB();

// Root route
app.get("/", (req, res) => {
    res.send("Voting System API is running...");
});

// Routes
app.use("/auth", auth);
app.use("/image", image);
app.use(authenticate);  // Apply the authenticate middleware globally
app.use("/voter", voter);
app.use("/party", party);
app.use("/election", election);
// app.use(authenticateCandidate); // Uncomment if needed
app.use("/candidates", candidate);
// app.use(authenticateAdmin); // Uncomment if needed
app.use("/admin", admin);
// app.use("/temp", temp); // Uncomment if needed

// Port configuration and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

