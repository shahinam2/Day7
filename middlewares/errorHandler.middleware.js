
/* -------------------------- error handler for 404 ------------------------- */
export const noRouteHandler = (req, res, next) => {
    const error = new Error('Not Found! 👺');
    error.status = 404;
    next(error)
}

/* --------------------------- main error handler --------------------------- */
export const mainErrorHandler = (err, req, res, next) => {
    if (err) {
        res.status(err.status || 500).send({error: err.message})
    }
}