const { User, Voter, Candidate, Admin } = require("../models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// 📌 Register User
const registerUser = async ({ name, email, password, role, party }) => {
    const emailLower = email.toLowerCase();

    let user = await User.findOne({ email: emailLower });
    if (user) throw new Error("User already exists");

    user = new User({ name, email: emailLower, password, role });
    await user.save();

    switch (role) {
        case "voter":
            await new Voter({ userId: user._id }).save();
            break;
        case "candidate":
            await new Candidate({ userId: user._id, party }).save();
            break;
        case "admin":
            await new Admin({ userId: user._id }).save();
            break;
    }

    return { message: "User registered successfully" };
};

// 📌 Login User
const loginUser = async ({ email, password }) => {
    const emailLower = email.toLowerCase();

    const user = await User.findOne({ email: emailLower });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return { token, role: user.role };
};

const getUserDetails = async (req) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id);
        if (!user) throw new Error("Cannot find user");
        return user;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserDetails
};
