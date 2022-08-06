const mongoose = require('mongoose');

const AuthorModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },    
    password: {
        type: String,
    },
    phonenumber: {
        type: Number,
    },    
    address: {
        type: String,
    },
    numberofarticles: {
        type: Number,
    }
});

const authorModel = mongoose.model("author", AuthorModel);

module.exports = authorModel;