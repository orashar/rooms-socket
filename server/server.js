const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socket= require('socket.io')
const io = socket(server, {cors:{origin:"*"}})
const connectDB = require('./db/mongodb')
const RoomModel = require('./models/room')
const UserModel = require('./models/user')


const roomRoutes = require('./routes/room')

const db = connectDB();
console.log(db)

app.use('/join/room', roomRoutes)

app.get('/', (req,res) => {
    return res.status(200).json({data: "welcome"})
})


let data = {

}

const generateRoomname = (length) => {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}

const createRoom = async (roomname, creator) => {
    const user = new UserModel({
        username: creator,
        creator: true,
    })
    const room = new RoomModel({
        roomname,
        users: [user]
    })
    try{
        await room.save()
        return room
    } catch(error){
        console.error(error)
        return null
    }
}

io.on('connection', socket => {
    console.log(`${socket.id} connected`)

    socket.on("join room", (roomname, cb) => {
        console.log(`${socket.id} joined in ${roomname}`)
        socket.join(roomname)
        cb(data[roomname], roomname)
    })

    socket.on("create room", (nickname) => {
        console.log(`request received to create room from user ${nickname}`)
        const roomname = generateRoomname(Math.floor(Math.random()*8) + 8)
        data[roomname] = {
            users:[nickname]
        }
        console.log(data)
        const roomObj = createRoom(roomname, nickname)
        if(roomObj) {
            socket.emit("room created", roomObj)
        }
        else socket.emit("room created", "roomCreationFailed")
    })
})

server.listen(1335, () => console.log("listening on 1335"))

