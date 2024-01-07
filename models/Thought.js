const mongoose = require('mongoose');
const { Schema } = mongoose;
const dateFormat = require('../util/dateFormat');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 200,
    },
    username: {
        type: String,
        required: true,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});

