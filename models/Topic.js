const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const TopicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    planID: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Topic = model('topic', TopicSchema )