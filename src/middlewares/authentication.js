const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { API_KEY } = require("../config/server.config");

function authenticate(req, res, next) {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
        ErrorResponse.error = { error: "Unauthorized Access" };
        ErrorResponse.message = {
            explanation: "API key not found in upcoming request",
        };
        return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }

    if (apiKey !== API_KEY) {
        ErrorResponse.error = { error: "Unauthorized Access" };
        ErrorResponse.message = {
            explanation: "API key not match",
        };
        return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }

    next();
}

module.exports = authenticate;
