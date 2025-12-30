import React, { useId, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomForm = ({uuid, socket, setUser})=>{

    const [roomId,setRoomId]=useState(uuid());
    const [name,setName]=useState("");
    const [copied, setCopied] = useState(false);

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

    const handleCopyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(roomId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            setCopied(false);
        }
    }

    return(
        <form className="form" onSubmit={handleCreateRoom}>
            <div className="form-group">
                <label>Your name</label>
                <input type="text" className="form-control" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Room code</label>
                <div className="input-group">
                    <input type="text" value={roomId} className="form-control" placeholder="Generate room code" disabled/>
                    <button className="btn btn-primary" type="button" onClick={()=>setRoomId(uuid())}>Generate</button>
                    <button className="btn btn-outline-secondary" type="button" onClick={handleCopyRoomId} disabled={!roomId}>
                        {copied ? "Copied" : "Copy"}
                    </button>
                </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Create & enter</button>
        </form>
    )

}


export default CreateRoomForm;