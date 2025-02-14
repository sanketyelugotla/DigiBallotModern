const multer = require("multer");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

const storage = multer.memoryStorage();
const upload = multer({ storage });

let gfsBucket;

// Ensure MongoDB connection before using GridFSBucket
mongoose.connection.on("connected", () => {
    gfsBucket = new GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
    console.log("✅ GridFSBucket initialized!");
});

module.exports = { upload, getGfsBucket: () => gfsBucket };
