const { Election } = require("../models");
const mongoose = require("mongoose");

const getElectionById = async (electionId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(electionId)) throw new Error("Invalid election ID");
        const election = await Election.findById(electionId);
        if (!election) throw new Error("No election found");
        return election;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getActiveElections = async () => {
    try {
        const currentDate = new Date();
        const activeElections = await Election.find({
            startDate: { $lte: currentDate },
            endDate: { $gte: currentDate }
        }).lean();

        return activeElections.length ? activeElections : [];
    } catch (error) {
        throw new Error("Error fetching active elections: " + error.message);
    }
};

const getAllElections = async () => {
    try {
        const elections = await Election.find().lean();
        return elections.length ? elections : [];
    } catch (error) {
        throw new Error("Error fetching all elections: " + error.message);
    }
};

const isElectionActive = async (electionId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(electionId)) throw new Error("Invalid election ID");
        
        const election = await Election.findById(electionId);
        if (!election) throw new Error("Election not found");

        const currentDate = new Date();
        const startDate = new Date(election.startDate);
        const endDate = new Date(election.endDate);

        return startDate <= currentDate && endDate >= currentDate;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getElectionById,
    getActiveElections,
    isElectionActive,
    getAllElections
};
