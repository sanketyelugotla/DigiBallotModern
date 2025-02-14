const multer = require("multer");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

const storage = multer.memoryStorage();
const upload = multer({ storage });

let gfsBucket = null;

// Ensure MongoDB connection before using GridFSBucket
mongoose.connection.once("open", () => {
    gfsBucket = new GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
    console.log("✅ GridFSBucket initialized!");
});

// Function to safely get GridFSBucket instance
const getGfsBucket = () => {
    if (!gfsBucket) {
        throw new Error("GridFSBucket is not initialized. Ensure MongoDB is connected.");
    }
    return gfsBucket;
};

module.exports = { upload, getGfsBucket };
