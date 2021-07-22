//importing mongoose library
const mongoose = require("mongoose");

const { Schema } = mongoose;

//defining characteristics of each object
const usersSchema = new Schema({
    name: {
        type: String,
        minlenght: 2,
        required: true
    },
    email: {
        type: String,
        minlenght: 6,
        maxlenght: 127,
        required: true
    }
})

//exporting so as to import from elsewhere (basically broadcasting xD)
module.exports = usersSchema