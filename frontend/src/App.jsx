
import Forms from './component/Forms/index.jsx';
import { Route,Routes } from 'react-router-dom';
import RoomPage from './pages/RoomPage/Index.jsx';
import io from "socket.io-client";
import {ToastContainer} from "react-toastify";
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';


const server =  'http://localhost:5000';
const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"]
};

const socket = io(server, connectionOptions);




function App() {

    const [user,setUser] = useState(null);
    const [users,setUsers] = useState([]);

    useEffect(() => {
        const handleUserIsJoined = (data) => {
            if(data.success){
                console.log("User successfully joined the room");
                setUsers(data.users);
            }
            else{
                console.log("Error joining the room");
            }
        };

        const handleAllUsers = (data) => {
            setUsers(data);
        };

        const handleUserJoinedMessage = (data) => {
            toast.info(`${data} has joined the room`);
        };

        const handleUserLeftMessage = (data) => {
            toast.error(`${data.name} has left the room`, { theme: 'colored' });
        };

        socket.on("userIsJoined", handleUserIsJoined);
        socket.on("allUsers", handleAllUsers);
        socket.on("userIsJoinedMessage", handleUserJoinedMessage);
        socket.on("userLeftMessage", handleUserLeftMessage);

        return () => {
            socket.off("userIsJoined", handleUserIsJoined);
            socket.off("allUsers", handleAllUsers);
            socket.off("userIsJoinedMessage", handleUserJoinedMessage);
            socket.off("userLeftMessage", handleUserLeftMessage);
        };
    },[]);

    const uuid = () => {
        let s4 = () => {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

  return (
    <>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick draggable pauseOnHover />
        <div className="app-shell">
            <Routes>
              <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser} />} />
              <Route path="/:roomId" element={<RoomPage user={user} socket={socket} users={users} />} />
            </Routes>
        </div>
    </>
  );
}

export default App;
