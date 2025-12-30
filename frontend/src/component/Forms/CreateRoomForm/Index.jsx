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
        <form className="form" onSubmit={handleCreateRoom}>
            <div className="form-group">
                <label>Your name</label>
                <input type="text" className="form-control" placeholder="Alex Doe" value={name} onChange={(e)=>setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Room code</label>
                <div className="input-group">
                    <input type="text" value={roomId} className="form-control" placeholder="Generate room code" disabled/>
                    <button className="btn btn-primary" type="button" onClick={()=>setRoomId(uuid())}>Generate</button>
                </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Create & enter</button>
        </form>
    )

}


export default CreateRoomForm;