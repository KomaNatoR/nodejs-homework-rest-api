const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

    // multerConfig                        // це обєкт налаштувань для мултера!
const multerConfig = multer.diskStorage({
    destination: tempDir,                  // це шлях до папки де ми будемо тимчасово зберігати файли!
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },                                     // це якщо ми хочемо перейменувати файл!
});
// створюємо мідлвару яка буде зберігати файли в тимчасовій папці!
const upload = multer({
    storage: multerConfig,
});


module.exports = upload;


// -------------------------------------------- TEST --------------------------------------------
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs/promises");
// const { nanoid } = require("nanoid");

// const tempDir = path.join( __dirname,"../../", "temp");
// // multerConfig це обєкт налаштувань для мултера!
// const multerConfig = multer.diskStorage({
//     destination: tempDir,// це шлях до папки де ми будемо тимчасово зберігати файли!
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }, // це якщо ми хочемо перейменувати файл!
// });
// // створюємо мідлвару яка буде зберігати файли в тимчасовій папці!
// const upload = multer({
//     storage: multerConfig,
// });

// const avatarsDir = path.join( __dirname,"../../", "public", "avatars");
// const test = async (req, res) => {
//     const { path: tempPath, filename } = req.file;
//     const resultUpload = path.join(avatarsDir, filename);
//     // console.log(tempPath);
//     // console.log(resultUpload);

//     await fs.rename(tempPath, resultUpload);
//     const ava = path.join( "avatars", filename);
//     const newBook = {
//         id: nanoid(),
//         ...req.body,
//         ava,
//     };
//     res.status(201).json(newBook);
// };

// upload.single("ava");                                -- один файл в одному полі!
// upload.array("назва поля", максим кільк файлів);     -- кілька файлів в одному полі!
// upload.fields([
//    { name: "імя поля", maxCount: макс кільк файлів },
//    { name: "імя поля", maxCount: макс кільк файлів },
// ]);                                                  -- кілька файлів в кількох полях!
// -----------------------------------------------------------------------------------------------