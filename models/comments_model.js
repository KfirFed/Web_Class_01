const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
});

const commentsModel = mongoose.model("Comments", commentsSchema);

module.exports = commentsModel;
