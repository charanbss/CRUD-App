//importing mongoose library
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/crud", 
{useNewUrlParser: true, useUnifiedTopology: true}
).then(() => {console.log("Database conneted")})
.catch((e) => {console.log("Databse connection error: " + e)})