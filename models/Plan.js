const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const PlanSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: Object,
        required: true
    },
    collaborators: {
        type: Array,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Item = model('plan', PlanSchema )