const express = require('express')
const router = express.Router()
const Plan = require('../../models/Plan')
const Topic = require('../../models/Topic')

router.get('/', async (req, res) => {
    try {
        const plans = await Plan.find()
        if (!plans) throw Error('no content!')
        res.status(200).json(plans)
    }
    catch (e) {
        res.status(400).json({
            msg: e.message
        })
    }
})

router.get('/:id', async (req, res) => {
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

router.post('/',  async (req, res) => {
    const newPlan = new Plan({...req.body})
    try{
        const plan = await newPlan.save()
        if (!plan) throw Error('Something went wrong while saving the plan')

        res.status(200).json(plan)
    }
    catch(e){
        res.status(400).json({
            msg: e.message
        })
    }
})

router.delete('/:id',  async (req, res) => {
    try{
        const plan = await Plan.findById(req.params.id)
        if (!plan) throw Error('No such plan found!')
        
        const removed = await plan.remove()
        if(!removed) throw Error('Something went wrong while deleting the plan')

        res.status(200).json({
            success: true
        })
    }
    catch(e){
        res.status(400).json({
            msg: e.message,
            success: false
        })
    }
})

module.exports = router