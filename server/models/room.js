const mongoose  = require('mongoose')
const User = require('./user')

const RoomSchema = new mongoose.Schema({
    roomname: {
        type: String,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})

const Room = mongoose.model("Room", RoomSchema)

module.exports = Room