import React from 'react'

/**
* @author
* @function Room
**/

const Room = (props) => {
  return(
    <div>
        <h1>Room {props.match.params.roomname}</h1>
        <button onClick={() => props.joinRoom(props.match.params.roomname)}>Join</button>
    </div>
   )

 }

export default Room