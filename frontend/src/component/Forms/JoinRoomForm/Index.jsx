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
        <form className="form col-md-12 mt-5" onSubmit={handleJoinRoom}>
            <div className="form-group">
                <label>Your Name</label>
                <input type="text" className="form-control" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Room Code</label>
                <input type="text" className="form-control" placeholder="Enter the room code" value={roomId} onChange={(e)=>setRoomId(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4" style={{fontWeight: "600"}}>Join Room</button>
        </form>
    )

}


export default JoinRoomForm;