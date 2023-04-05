const mongoose = require('mongoose');
const DB_HOST="mongodb+srv://Serhii:2545data2545@cluster0.bsgspqj.mongodb.net/contacts_reader?retryWrites=true&w=majority"


const app = require('./app')
// 2545data2545

mongoose.connect(DB_HOST)
  .then(()=>app.listen(3000, () => console.log("Server running. Use our API on port: 3000")))
  .catch(err=>console.log(err.message));
