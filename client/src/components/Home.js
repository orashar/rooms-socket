import React, { useState } from 'react'

/**
* @author
* @function Home
**/

const Home = (props) => {
    const [inputRoomname, setInputRoomname] = useState("")
    
    const handleRoomnameInput = (e) => {
        setInputRoomname(e.target.value)
    }
  
    return(
    <div>
        <h1>Welcome to withDraw</h1>
        <input type="text" onChange={handleRoomnameInput} placeholder="Enter your nickname"/><br/>
        <button onClick={() => props.createRoom(inputRoomname)}>Create Room</button>
    </div>
   )

 }

export default Home