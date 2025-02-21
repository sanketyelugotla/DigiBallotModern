const express = require("express");
const election = express.Router();
const { electionService } = require("../services/index");

election.get("/", async (req, res) => {
    try {
        const elections = await electionService.getActiveElections();
        return res.status(200).json({ messsage: "Active elections", elections })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})

election.get("/all", async (req, res) => {
    try {
        const elections = await electionService.getAllElections();
        return res.status(200).json(elections);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})

module.exports = election