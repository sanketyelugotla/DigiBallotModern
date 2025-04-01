const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const { auth, candidate, party, admin, election, voter, image } = require("./routes/index.js");
const authenticate = require("./middleware/authenticate.js");
const authenticateCandidate = require("./middleware/authenticateCandidate.js");
const authenticateAdmin = require("./middleware/authenticateAdmin.js");
require("dotenv").config();

const app = express();

const corsOptions = {
    origin: 'https://digi-ballot.vercel.app', //Allow your front end origin.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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

