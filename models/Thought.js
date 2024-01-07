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
        maxLength: 280,
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

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
}); const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;

