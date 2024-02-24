function errorHandler(err, req, res, next) {

    // Send the error message as the response
    res.json({
        valid: false,
        status: err.status,
        message: err.message,
        stackTrash: err.stackTrash      
    });
}

module.exports = errorHandler;