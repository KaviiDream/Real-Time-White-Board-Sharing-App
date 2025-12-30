import React, { useId, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomForm = ({uuid, socket, setUser})=>{

    const [roomId,setRoomId]=useState(uuid());
    const [name,setName]=useState("");

    const navigate = useNavigate();

    const handleCreateRoom = (e) =>{
        e.preventDefault();
        const roomData = {
            name,
            roomId,
            userId: uuid(),
            host: true,
            presenter:true
        }

        setUser(roomData);
        navigate(`/${roomId}`);
        console.log(roomData);
        socket.emit("joinRoom", roomData);
    }

    return(
        <form className="form col-md-12 mt-5" onSubmit={handleCreateRoom}>
            <div className="form-group">
                <label>Your Name</label>
                <input type="text" className="form-control" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Room Code</label>
                <div style={{display: "flex", gap: "0.75rem", alignItems: "center"}}>
                    <input type="text" value={roomId} className="form-control" placeholder="Generate Room Code" disabled/>
                    <button type="button" className="btn btn-primary" onClick={()=>setRoomId(uuid())} style={{whiteSpace: "nowrap"}}>Generate</button>
                </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4" style={{fontWeight: "600"}}>Create & Join Room</button>
        </form>
    )

}


export default CreateRoomForm;