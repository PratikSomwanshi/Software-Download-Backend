const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { API_KEY } = require("../config/server.config");

function authenticate(req, res, next) {
    const apiKey = req.headers["x-api-key"];

    ErrorResponse.error = { error: "Unauthorized Access" };
    ErrorResponse.message = {
        explanation: "API key not found in upcoming request",
    };

    if (!apiKey) {
        return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }

    ErrorResponse.error = { error: "Unauthorized Access" };
    ErrorResponse.message = {
        explanation: "API key not match",
    };

    if (apiKey !== API_KEY) {
        return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }
    next();
}

module.exports = authenticate;
