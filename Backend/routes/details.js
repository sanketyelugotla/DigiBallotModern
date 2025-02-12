const mongoose = require("mongoose");
const User = require("../models/User");
const Voter = require("../models/Voter");
const Candidate = require("../models/Candidate");
const Admin = require("../models/Admin");
const express = require("express");

require("dotenv").config();

const details = express.Router();

details.post("/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log(data)
    try {
        const updateCandidate = await Candidate.findByIdAndUpdate(
            id,
            { ...data },
            { new: true }
        )
        if (!updateCandidate) {
            return res.status(404).json({ message: "Cannot find candidate" })
        } else {
            return res.status(200).json({ message: updateCandidate });
        }
    } catch (error) {
        return res.status(500).json({message: "Server error"});
    }
})

module.exports = details;
