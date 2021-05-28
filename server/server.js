const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socket= require('socket.io')
const io = socket(server)


const roomRoutes = require('./routes/room')

app.use('/join/room', roomRoutes)

app.get('/', (req,res) => {
    return res.status(200).json({data: "welcome"})
})


server.listen(1335, () => console.log("listening on 1338"))