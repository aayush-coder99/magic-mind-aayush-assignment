export default class ErrorHandler {
    constructor({
        shouldLog = false,
    }) {
        this.shouldLog = shouldLog;
    }

    /**
     */
    unhandledRequest() {
        return (req, res, next) => {
            if (!res.headersSent) {
                // Handle unhandled requests
                return res.status(404).json({
                    message: 'Request is not handled',
                    error: 'Not Implemented',
                    statusCode: 404,
                });
            }
            return next();
        };
    }
}
