const express = require('express')

const { db } = require('./src/db/model')
const { userRoute } = require('./src/routes/users')
const { postsRoute } = require('./src/routes/posts')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/users', userRoute)
//app.use('/api/users', require('./src/routes/users'))
app.use('/api/posts', postsRoute)
app.use('/', express.static('src/public'))     /*__dirname + */

db.sync()
    .then(() => {
        app.listen(8383, () => {
            console.log("Server started at http://localhost:8383")
        })
    })
    .catch((err) => {
        console.error(new Error('Could not start database...'))
        console.error(err)
    })