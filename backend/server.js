const express = require("express")
const app = express() 

const server = require("http").createServer(app)
const {Server} = require("socket.io")

const io = new Server (server)

const { addUser, removeUser, getAllUsersInRoom, getUser } = require ("./utils/users.js")

//routes
app.get("/",(req,res)=>{
    res.send("This is MERN Real-Time Whire Board By Kavindu")
    }
)

let roomIdGlobal,imageURLGlobal;
const roomMessages = {};

io.on("connection",(socket)=>{
    socket.on("joinRoom",(data)=>{
        const {name, userId, roomId, host, presenter} = data;
        roomIdGlobal = roomId;
        socket.join(roomId);
        const users = addUser({name, userId, roomId, host, presenter, socketId: socket.id});
        socket.emit("userIsJoined", {success:true, users });
        socket.broadcast.to(roomId).emit("userIsJoinedMessage", name);
        socket.broadcast.to(roomId).emit("allUsers",users);
        socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {imageURL: imageURLGlobal});
        socket.emit("chatHistory", roomMessages[roomId] || []);
    })

    socket.on("whiteboardData",(data)=>{
        imageURLGlobal = data;
        socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", {imageURL: data});
    })

    socket.on("sendMessage",({roomId, userId, message})=>{
        const text = (message || "").trim();
        if(!roomId || !text){
            return;
        }
        const author = getUser(userId) || {};
        const payload = {
            userId: author.userId || userId,
            name: author.name || "Anonymous",
            message: text,
            timestamp: new Date().toISOString()
        };
        if(!roomMessages[roomId]){
            roomMessages[roomId] = [];
        }
        roomMessages[roomId].push(payload);
        roomMessages[roomId] = roomMessages[roomId].slice(-100);
        io.to(roomId).emit("newMessage", payload);
    })

    socket.on("disconnect",()=>{
        const user = removeUser(socket.id);
        if(user){
            const users = getAllUsersInRoom(user.roomId);
            socket.broadcast.to(user.roomId).emit("userLeftMessage", user);
            io.to(user.roomId).emit("allUsers", users);
        }
    })
})

const port = process.env.PORT || 5000
server.listen(port,()=> console.log(`Server is running on port ${port}`))