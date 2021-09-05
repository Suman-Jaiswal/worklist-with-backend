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
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Item = model('plan', PlanSchema )