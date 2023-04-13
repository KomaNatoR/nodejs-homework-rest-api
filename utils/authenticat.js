const jwt = require("jsonwebtoken");

const { User } = require("../models/users");
const {HttpError} = require("../utils");
const { SECRET_KEY } = process.env;

const authenticat = async (req, res, next) => {
    const { authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    // console.log("authorization!!!", authorization);
    if (bearer !== "Bearer") return next(HttpError(401));
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user) return next(HttpError(401));
        next();
    } catch  {
        next(HttpError(401));
    }
}


module.exports = authenticat;