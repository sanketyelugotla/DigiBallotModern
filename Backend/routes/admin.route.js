const express = require("express");
const { adminService } = require("../services")
const { upload } = require("../config/multerConfig.js");
const admin = express.Router();

admin.post("/update", upload.fields([{ name: "image" }]), async(req, res) => {
    const {fullname, dob, email, gender, number, password} = req.body;
    try {
        const admin = await adminService.updateDetails(fullname, dob, email, gender, number, password, req);
        res.status(201).json({ message: "Details updated successfully", admin })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})

admin.post("/addElection", upload.fields([{ name: "pic" }]), async (req, res) => {
    const { name, startDate, endDate } = req.body;
    try {
        const election = await adminService.addElection(name, startDate, endDate, req.user._id, req.files);
        res.status(201).json({ message: "Election created successfully", election })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})

admin.get("/electionImage/:imageId", async (req, res) => {
    try {
        const downloadStream = await adminService.getElectionImage(req.params.imageId);
        res.set("Content-Type", "image/png");
        downloadStream.pipe(res);
    } catch (error) {
        console.error("Error fetching candidate image:", error);
        return res.status(400).json({ message: error.message });
    }
});

admin.post("/approveCandidate/:candidateId", async (req, res) => {
    try {
        const candidate = await adminService.approveCandidate(req.params.candidateId);
        if (!candidate) throw new Error("Could not register approve candidate");
        res.status(200).json({ message: "Candidate approved successfully", candidate })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})

admin.post("/approve-candidates-bulk", async (req, res) => {
    try {
        const { candidateIds, electionIds } = req.body;

        // Call the bulk approval service
        const result = await adminService.approveCandidatesBulk(candidateIds, electionIds);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

admin.get("/candidates", async (req, res) => {
    try {
        const candidates = await adminService.getPendingCandidates();
        return res.status(200).json(candidates);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})

admin.get("/users", async (req, res) => {
    try {
        const users = await adminService.getPendingUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
})

admin.post("/approveUser/:userId", async (req, res) => {
    try {
        const user = await adminService.approveVoter(req.params.userId);
        if (!user) throw new Error("Could not register approve user");
        res.status(200).json({ message: "User approved successfully", user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})

admin.post("/approve-users-bulk", async (req, res) => {
    try {
        const { userIds, electionIds } = req.body;

        // Call the bulk approval service
        const result = await adminService.approveVotersBulk(userIds, electionIds);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

admin.post("/declare/:electionId", async (req, res) => {
    try {
        const results = await adminService.declareElection(req.params.electionId);
        return res.status(201).json({ message: results.winner })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})


module.exports = admin