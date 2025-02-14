const express = require("express")
const router = express.Router();

router.post("/addParty", async (req, res) => {
    const { party } = req.body;
    res.send(party)
})

module.exports = router