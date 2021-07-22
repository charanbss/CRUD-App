//importing mongoose library
const mongoose = require("mongoose");

//importing schema files
const usersSchema = require("./schema")

//using model method from mongoose library
const User = mongoose.model("Users", usersSchema);

//exporting so as to import from elsewhere (basically broadcasting xD)
module.exports = User;