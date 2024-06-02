const { SoftwareRepository } = require("../repository");
const AppError = require("../utils/error/AppError");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

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

async function createImage(req, res) {
    try {
        const softwareData = {
            image_url: `${req.protocol}://${req.get("host")}/uploads/${
                req.file.filename
            }`,
        };

        SuccessResponse.data = softwareData;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }
}

module.exports = {
    createSoftware,
    createImage,
    getAllSoftware,
    deleteSoftware,
    updateSoftware,
    getSoftware,
};
