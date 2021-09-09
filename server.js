const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const path = require('path')
const planRouter = require('./routes/api/plans')
const topicRouter = require('./routes/api/topics')
require('dotenv').config()
const DB_URI = process.env.MONGO_URI
const port = process.env.PORT || 5000;

//database connection
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})
.then(res => console.log('mongoDB connected...'))
.catch(err => console.log(err))


//middleware
// app.use(cors)

app.use(express.json())
app.use('/api/plans', planRouter)
app.use('/api/topics', topicRouter)

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// server
app.listen(port, () => {
    console.log(`Listening on the port: ${port}`);
});