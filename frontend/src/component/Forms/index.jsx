
import CreateRoomForm from "./CreateRoomForm/Index";
import JoinRoomForm from "./JoinRoomForm/Index";
import "./index.css"

const Forms = ({uuid, socket, setUser})=>{

    return(
        <div className="forms-container">
            <div className="form-card">
                <h1>✨ Create Room</h1>
                <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
            </div>
            <div className="form-card">
                <h1>🚪 Join Room</h1>
                <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} />
            </div>
        </div>
    )

}



export default Forms;