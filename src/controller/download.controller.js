const { StatusCodes } = require("http-status-codes");
const { SoftwareService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createSoftware(req, res) {
    try {
        const {
            description,
            builtBy,
            price,
            releaseDate,
            latestVersion,
            platform,
            os,
            name,
        } = req.body;

        const osArray = os.split(",").map((item) => item.trim());
        const platformArray = platform.split(",").map((item) => item.trim());

        const data = {
            image: `${req.protocol}://${req.get("host")}/uploads/images/${
                req.files[0].filename
            }`,
            fileUrl: `${req.protocol}://${req.get("host")}/uploads/files/${
                req.files[1].filename
            }`,
            description,
            builtBy,
            price,
            releaseDate,
            latestVersion,
            platform: platformArray,
            os: osArray,
            name,
        };

        const software = await SoftwareService.createSoftware(data);
        SuccessResponse.data = software;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function getAllSoftware(req, res) {
    try {
        const software = await SoftwareService.getAllSoftware();
        SuccessResponse.data = software;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function getSoftware(req, res) {
    try {
        const query = req.body.query;
        const software = await SoftwareService.getSoftware(query);
        SuccessResponse.data = software;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function updateSoftware(req, res) {
    try {
        const { id, ...data } = req.body;
        const software = await SoftwareService.updateSoftware(id, data);
        SuccessResponse.data = software;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function deleteSoftware(req, res) {
    try {
        const { id } = req.body;
        console.log(req.body);
        const software = await SoftwareService.deleteSoftware(id);
        SuccessResponse.data = software;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

module.exports = {
    createSoftware,
    getAllSoftware,
    deleteSoftware,
    updateSoftware,
    getSoftware,
};
