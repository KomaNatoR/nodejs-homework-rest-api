const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");

const { User } = require("../models/users");
const { HttpError, ctrlWrapper } = require("../utils");
const { SECRET_KEY } = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");


const register = async (req, res) => {
    const { email, password } = req.body;

    const user =await User.findOne({ email });
    if (user) throw HttpError(409, "Email in use");

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

    res.status(201).json({
        user: {
            email: newUser.email,
            // password:newUser.password,
            subscription: newUser.subscription,
        },
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw HttpError(401, "Email or password is wrong");

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

    const payload = {
        id:user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "48h" });
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

const getCurrent= async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription,
    })
};

const logout= async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json();
    // res.json({
    //     message:"Logout Success!"
    // });
};

const subscription= async (req, res) => {
    const { _id } = req.user;
    
    await User.findByIdAndUpdate(_id, req.body);
    res.json({
        message: `Subscription changed to ${Object.values(req.body)}!`
    });
};

const updateAvatar= async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, filename } = req.file;

    const avatarName = `${_id}_${filename}` 
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join( "avatars", avatarName);
    await User.findByIdAndUpdate(_id, {avatarURL});
    res.json({
        avatarURL
    });
};


module.exports = {
    register:ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    subscription: ctrlWrapper(subscription),
    updateAvatar: ctrlWrapper(updateAvatar),
}