const mongoose = require("mongoose");
const { getGfsBucket } = require("../config/multerConfig.js");

async function uploadFile(file) {
    return new Promise((resolve, reject) => {
        const gfsBucket = getGfsBucket();
        if (!gfsBucket) {
            return reject(new Error("GridFSBucket not initialized"));
        }

        const uploadStream = gfsBucket.openUploadStream(file.originalname, {
            contentType: file.mimetype,
        });

        uploadStream.end(file.buffer, (err) => {
            if (err) return reject(err);
            resolve(uploadStream.id);
        });
    });
}

async function getFileStream(fileId) {
    return new Promise((resolve, reject) => {
        const gfsBucket = getGfsBucket();
        if (!gfsBucket) {
            return reject(new Error("GridFSBucket not initialized"));
        }

        try {
            const downloadStream = gfsBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
            resolve(downloadStream);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { uploadFile, getFileStream };
