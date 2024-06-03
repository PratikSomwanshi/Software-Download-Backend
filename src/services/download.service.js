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

async function updateSoftware(id, data) {
    try {
        return await softwareRepository.update(id, data);
    } catch (error) {
        throw new AppError(error, StatusCodes.BAD_REQUEST);
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
