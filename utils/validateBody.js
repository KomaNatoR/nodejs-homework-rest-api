const { HttpError } = require("../helpers");

const validateBody = schema => {
    const func = async (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            // next(res.status(400).json({ "message": "missing fields"}));
            next(HttpError(400, "missing fields"));
        }
        next();
    }
    return func;
}

module.exports = validateBody;