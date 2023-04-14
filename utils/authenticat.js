const jwt = require("jsonwebtoken");

const { User } = require("../models/users");
const HttpError = require("./HttpError");
const { SECRET_KEY } = process.env;

const authenticat = async (req, res, next) => {
    const { authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    // console.log("ITS ME authorization!!!", authorization);
    if (bearer !== "Bearer") return next(HttpError(401));
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        // console.log("id!!!",id);
        const user = await User.findById(id);
        if (!user || !user.token) return next(HttpError(401)); 
        req.user = user;                      // створ. в об-ті req власт-ь user і записуємо дані з const user!
        next();
    } catch  {
        next(HttpError(401));
    }
}


module.exports = authenticat;