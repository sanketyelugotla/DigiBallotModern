const { Election } = require("../models");
const mongoose = require("mongoose");

const getElectionById = async (electionId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(electionId)) throw new Error("Invalid election ID");
        const election = await Election.findById(electionId);
        if (!election) throw new Error("No election found");
        return election;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { getElectionById }