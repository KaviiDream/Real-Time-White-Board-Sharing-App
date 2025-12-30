import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({uuid,socket,setUser})=>{

    const [roomId,setRoomId]=useState("");
    const [name,setName]=useState("");

    const navigate = useNavigate();

    const handleJoinRoom = (e) =>{
        e.preventDefault();
        const roomData = {
            name,
            roomId,
            userId: uuid(),
            host: false,
            presenter:false
        }

        setUser(roomData);
        navigate(`/${roomId}`);
        console.log(roomData);
        socket.emit("joinRoom", roomData);
    }

    return(
        <form className="form" onSubmit={handleJoinRoom}>
            <div className="form-group">
                <label>Your name</label>
                <input type="text" className="form-control" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Room code</label>
                <input type="text" className="form-control" placeholder="e.g. abcd-1234" value={roomId} onChange={(e)=>setRoomId(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Join room</button>
        </form>
    )

}


export default JoinRoomForm;