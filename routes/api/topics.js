const express = require('express')
const router = express.Router()
const Topic = require('../../models/Topic')

router.get('/', async (req, res) => {
    try {
        const topics = await Topic.find().select('planID completed')
        if (!topics) throw Error('no content!')
        res.status(200).json(topics)
    }
    catch (e) {
        res.status(400).json({
            msg: e.message
        })
    }
})

router.get('/:planID', async (req, res) => {
    try {
        const { planID } = req.params
        const topics = await Topic.find({ planID })
        if (!topics) throw Error('no content!')
        res.status(200).json(topics)
    }
    catch (e) {
        res.status(400).json({
            msg: e.message
        })
    }
})


router.post('/:planID', async (req, res) => {
    const newTopics = req.body.topics

    for (let i = 0; i < newTopics.length; i++) {
        const newTopic = new Topic(newTopics[i]);
        try {
            const topic = await newTopic.save()
            if (!topic) throw Error('Something went wrong while saving the topic')

        }
        catch (e) {
            res.status(400).json({
                msg: e.message
            })
        }
    }
    res.status(200).json(newTopics)


})

router.put('/:id', (req, res) => {

    Topic.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(
        Topic.findById(req.params.id)
        .then(topic => {
            res.header("Access-Control-Allow-Origin", "*");
            res.status(200).json(topic)
        })
    )

})

router.delete('/:planID',  async (req, res) => {
    try{
        const topics = await Topic.deleteMany({planID: req.params.planID})
        
        if(!topics) throw Error('Something went wrong while deleting the plan')

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

router.delete('/topic/:id',  async (req, res) => {
    try{
        const topic = await Topic.findById(req.params.id)
        if (!topic) throw Error('No such topic found!')
        
        const removed = await topic.remove()
        if(!removed) throw Error('Something went wrong while deleting the topic')

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