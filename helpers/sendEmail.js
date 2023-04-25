const nodemailer = require("nodemailer");
// require("dotenv").config;

const { META_PASSWORD } = process.env;

const nadomailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "serhii.markov@meta.ua",
        pass: META_PASSWORD,
    },
};
const transport = nodemailer.createTransport(nadomailerConfig);

// const email = {
//     to: "kinedav149@huvaclid.com",
//     from: "bogdan.lyamzin.d@meta.ua",
//     subject: "Test email",
//     html: "<p>Hello!</p>",
// };
// transport.sendMail(email).then(() => console.log("Em succ!")).catch(err => console.log(err));

const sendEmail =async (data) => {
    const email = { ...data, from: "serhii.markov@meta.ua" };
    await transport.sendMail(email);
    return true;
};


module.exports = sendEmail;