const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: {type: String},
    email: {type: String},
    number: {type: Number},
    gender: { type: String, enum: ["Male", "Female"] },
});

module.exports = mongoose.model("Admin", AdminSchema);