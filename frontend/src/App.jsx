
import Forms from './component/Forms/index.jsx';
import { Route,Routes } from 'react-router-dom';
import RoomPage from './pages/RoomPage/Index.jsx';
import io from "socket.io-client";
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

    useEffect(() => {
        socket.on("userIsJoined", (data) => {
            if(data.success){
                console.log("User successfully joined the room");
            }
            else{
                console.log("Error joining the room");
            }
        });
    },[])

    const uuid = () => {
        let s4 = () => {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

  return (
    <div className="container">
    <Routes>
      <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser} />} />
      <Route path="/:roomId" element={<RoomPage />} />
    </Routes>
    
    </div>
  );
}

export default App;
