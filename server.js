const express = require('express')
const mongoose = require('mongoose')
const app = express()
const planRouter = require('./routes/api/plans')
const topicRouter = require('./routes/api/topics')
require('dotenv').config()
const DB_URI = process.env.MONGO_URI
const port = process.env.PORT || 5000;

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})
.then(res => console.log('mongoDB connected...'))
.catch(err => console.log(err))

app.use(express.json())

app.use('/api/plans', planRouter)
app.use('/api/topics', topicRouter)

app.listen(port, () => {
    console.log(`Listening on the port: ${port}`);
});