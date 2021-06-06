require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.ATLAS_MONGO_URI

async function connectDB(){
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    })

    const connection = mongoose.connection
    await connection.once('open', () => {
        console.log("DB connected")
    }).catch(e => console.error(`DB connection failed with error : ${e}`))
}

module.exports = connectDB