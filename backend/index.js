require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')

var cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())


// app.use(cors());

// app.get('/', (req,res)=>{
//     res.send ('hello world')

// })


// availabel routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes/', require('./routes/notes'))


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('inotebook backend  $ listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })