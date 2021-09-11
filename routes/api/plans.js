const express = require('express')
const router = express.Router()
const Plan = require('../../models/Plan')
const Topic = require('../../models/Topic')

router.get('/:collaborator', async (req, res) => {
    try {
        const plans = await Plan.find({
            collaborators: req.params.collaborator
        })
        if (!plans) throw Error('no content!')
        res.status(200).json(plans)
    }
    catch (e) {
        res.status(400).json({
            msg: e.message
        })
    }
})

router.get('/plan/:id', async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id)
        if (!plan) throw Error('no content!')
        res.status(200).json(plan)
    }
    catch (e) {
        res.status(400).json({
            msg: e.message
        })
    }
})

router.post('/', async (req, res) => {
    const newPlan = new Plan({ ...req.body })
    try {
        const plan = await newPlan.save()
        if (!plan) throw Error('Something went wrong while saving the plan')

        res.status(200).json(plan)
    }
    catch (e) {
        res.status(400).json({
            msg: e.message
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id)
        if (!plan) throw Error('No such plan found!')

        const removed = await plan.remove()
        if (!removed) throw Error('Something went wrong while deleting the plan')

        res.status(200).json({
            success: true
        })
    }
    catch (e) {
        res.status(400).json({
            msg: e.message,
            success: false
        })
    }
})

router.put('/:id', (req, res) => {
    const { title, description } = req.body
    Plan.findByIdAndUpdate(req.params.id, { title, description }, { new: true }, (err, doc) => {
        if (err) res.status(400).json({
            msg: err.message
        })
        else res.status(200).json(doc)
    })
})

router.put('/share/:id', async (req, res) => {
    try {
        const { collaborators } = req.body
        Plan.findByIdAndUpdate(req.params.id, { collaborators }, { new: true }, (err, doc) => {
            if (err) throw Error('Something went wrong while adding collaborator')
            else res.status(200).json(doc)
        })
    }
    catch (e) {
        res.status(400).json({
            msg: e.message
        })
    }
})

module.exports = router