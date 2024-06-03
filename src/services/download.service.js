const { SoftwareRepository } = require("../repository");
const AppError = require("../utils/error/AppError");
const { StatusCodes, getStatusCode } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { Software } = require("../model");
const fs = require("fs");

const softwareRepository = new SoftwareRepository();

async function createSoftware(data) {
    try {
        return await softwareRepository.create(data);
    } catch (error) {
        throw new AppError(error, StatusCodes.BAD_REQUEST);
    }
}

async function getAllSoftware() {
    try {
        return await softwareRepository.getAll();
    } catch (error) {
        throw new AppError(error, StatusCodes.BAD_REQUEST);
    }
}

async function getSoftware(query) {
    try {
        return await softwareRepository.getAll(query);
    } catch (error) {
        throw new AppError(error, StatusCodes.BAD_REQUEST);
    }
}

async function updateSoftware(id, req, data) {
    try {
        const software = await Software.findById(id);

        if (!software) {
            throw new AppError("Software not found", StatusCodes.NOT_FOUND);
        }

        // Check if a new file is uploaded
        if (data.files["file"]) {
            // Save the old file path to delete later
            const oldFilePath = software.fileUrl;

            // Update the fileUrl with the new file path
            software.fileUrl = `upload/files/${data.files["file"][0].filename}`;

            // Delete the old file if it exists
            if (oldFilePath) {
                fs.unlink(oldFilePath, (err) => {
                    if (err) {
                        console.error("Failed to delete old file:", err);
                    } else {
                        console.log("Old file deleted successfully");
                    }
                });
            }
        }

        // Check if a new image is uploaded
        if (data.files["image"]) {
            // Save the old image path to delete later
            const oldImagePath = software.image;

            // Update the image with the new image path
            // software.image = data.files["image"][0].filename;
            software.image = `${req.protocol}://${req.get(
                "host"
            )}/upload/images/${data.files["image"][0].filename}`;

            // Delete the old image if it exists
            if (oldImagePath) {
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error("Failed to delete old image:", err);
                    } else {
                        console.log("Old image deleted successfully");
                    }
                });
            }
        }

        // Update other fields as needed
        if (data.name) software.name = data.name;
        if (data.description) software.description = data.description;
        if (data.builtBy) software.builtBy = data.builtBy;
        if (data.price) software.price = data.price;
        if (data.releaseDate) software.releaseDate = data.releaseDate;
        if (data.latestVersion) software.latestVersion = data.latestVersion;
        if (data.platform) software.platform = data.platform;
        if (data.os) software.os = data.os;

        // Save the updated software document
        await software.save();

        return software;
    } catch (error) {
        console.error("Error updating software:", error);

        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError("Error updating software", StatusCodes.BAD_REQUEST);
    }
}

async function deleteSoftware(id) {
    try {
        return await softwareRepository.delete(id);
    } catch (error) {
        throw new AppError(error, StatusCodes.BAD_REQUEST);
    }
}

async function downloadSoftware(id) {
    try {
        const file = await Software.findById(id);

        if (!file) {
            throw new AppError("file not found", StatusCodes.NOT_FOUND);
        }

        // const filePath = file.fileUrl;

        return file;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createSoftware,
    getAllSoftware,
    deleteSoftware,
    updateSoftware,
    getSoftware,
    downloadSoftware,
};
