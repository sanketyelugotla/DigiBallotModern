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

const getActiveElections = async () => {
    const currentDate = new Date();

    const activeElections = await Election.find({
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate }
    }).lean();

    return activeElections.length ? activeElections : [];
};

const getAllElections = async () => {
    const elections = await Election.find()
    return elections.length ? elections : [];
};

const isElectionActive = async (electionId) => {
    try {
        const currentDate = new Date();
        const election = await Election.findById(electionId);

        if (!election) throw new Error("Election not found");

        const startDate = new Date(election.startDate);
        const endDate = new Date(election.endDate);
        const status = startDate <= currentDate && endDate >= currentDate
        return { election, status };
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getElectionById,
    getActiveElections,
    isElectionActive,
    getAllElections
}