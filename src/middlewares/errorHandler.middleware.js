const { UniqueConstraintError } = require("@sequelize/core");

const notFoundError = (req, res, next) => {
    return res.status(404).json({
        success: false,
        statusCode: res.statusCode,
        error: {
            type: 'NotFound',
            message: `Route ${req.url} not found.`
        }
    });
}

const errorPreprocessor = (err, req, res, next) => {
    if (err instanceof UniqueConstraintError) {
        err.details = `This ${err.errors[0].path} is already exists.`;        
        throw err;
    }
}

const allErrorHandler = (err, req, res, next) => {
    const statusCode = err?.status ?? err?.statusCode ?? 500;
    if (process.env.NODE_ENV === "development") console.log(err);
    return res.status(statusCode).json({
        success: false,
        statusCode,
        error: {
            message: err?.message ?? err?.stack ?? "InternalServerError",
            details: err?.details
        }
    });
}

module.exports = {
    notFoundError,
    errorPreprocessor,
    allErrorHandler
};