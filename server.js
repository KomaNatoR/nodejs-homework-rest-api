const mongoose = require('mongoose');
// require("dotenv").config();

const app = require('./app');

// const { DB_HOST } = require("./config");
const { DB_HOST, PORT=4000 } = process.env;

mongoose.connect(DB_HOST)
  .then(()=>app.listen(PORT, () => console.log(`"Database connection successful!" PORT:${PORT}`)))
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });

// mongoose.connect(DB_HOST)
//   .then(() => console.log("Database connection successful!"))
//   .catch(err=>console.log(err.message));