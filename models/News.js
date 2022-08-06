const mongoose = require('mongoose');

const NewsModel = new mongoose.Schema({
    newsheadline: {
        type: String,
        required: true,
    },
    newsdescription: {
        type: String,
    },    
    newslocation: {
        type: String,
    },
    newsauthor: {
        type: String,
    },
});

const newsModel = mongoose.model("news", NewsModel);

module.exports = newsModel;