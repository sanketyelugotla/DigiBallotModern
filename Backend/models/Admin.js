const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    number: {type: String},
    gender: { type: String, enum: ["Male", "Female"] },
    image: {type: String},
    dob: { type: Date },
});

module.exports = mongoose.model("Admin", AdminSchema);