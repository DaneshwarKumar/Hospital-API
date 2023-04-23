

// connecting nodejs with mongodb using mongoose 
const mongoose = require("mongoose");


mongoose.connect('mongodb://127.0.0.1:27017/Hospital-API')
.then(() => console.log("Mongodb Connected successfully"))
.catch((err) => console.log("not Connected"));


