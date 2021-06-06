
import './App.css';
import io from 'socket.io-client'
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Room from './components/Room'
import Home from './components/Home';

const data = {
  
}

function App() {

  const socketRef = useRef()
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false)
  const [currentRoomname, setCurrentRoomname] = useState("")

  useEffect(() => {
    console.log(socketRef.current)
    socketRef.current = io.connect("http://localhost:1335/", {transports: ['websocket']})
    console.log(socketRef.current)

    socketRef.current.on('connection', () => console.log("Connected to server"))
    
    socketRef.current.on("room created", (roomname) => {
      console.log(`Room created with name ${roomname}`)
      setCurrentRoomname(roomname)
      setHasJoinedRoom(true)
      // return <Redirect to={`/join/room/${roomname}`}/>
    })
    }, [])

  const joinRoom = (roomname) => {
    console.log(`Joining ${roomname}`)
    if(!data[roomname]) data[roomname] = []
    socketRef.current.emit("join room", roomname, (messages) => roomJoinCallback(data, roomname))
  }

  const roomJoinCallback = (data, roomname) => {
    console.log(`room jojn cb ${data} / ${roomname}`)
  }

  const createRoom = (roomname) => {
    socketRef.current.emit("create room", roomname)
    
  }

  return (
    <Router>
    { (hasJoinedRoom) ? <Redirect to={`/join/room/${currentRoomname}`}/> : null}
    <Switch>
    <Route path="/" exact render={props => (<Home {...props} createRoom={createRoom}/>)}/>
    <Route path="/join/room/:roomname" exact render={props => (<Room {...props} joinRoom={joinRoom}/>)}/>
    </Switch>
    </Router>
    
  );
}

export default App;
