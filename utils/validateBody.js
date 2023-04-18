const HttpError = require("./HttpError");

const validateBody = schema => {
    const func = async (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            // const missingField = error.message.replace("is required", "").trim().slice(1, -1);
            // next(HttpError(400, `missing ${missingField} field`));
            next(HttpError(400, error.message));
        }
        next();
    }
    return func;
}

module.exports = validateBody;