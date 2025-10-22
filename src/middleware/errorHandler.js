export function errorHandler(err, req, res) {
    console.error(err);
    const status = err.status || 404;
    const message = err.message || 'Serverda Xatolik';

    res.status(status).json({
        success: false,
        message,
    });
}
