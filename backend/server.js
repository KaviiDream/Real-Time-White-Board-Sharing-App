const express = require("express")
const app = express()

const server = require("http").createServer(app)
const { Server } = require("socket.io")

const io = new Server(server, {
    // Allow the Vite dev server (default 5173) to talk to Socket.IO
    cors: {
        origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
})

const { addUser, removeUser, getAllUsersInRoom, getUser } = require("./utils/users.js")

//routes
app.get("/",(req,res)=>{
    res.send("This is MERN Real-Time Whire Board By Kavindu")
    }
)

// Track per-room data so multiple rooms don't clash
const roomMessages = {}
const roomImages = {}

io.on("connection",(socket)=>{
    socket.on("joinRoom", (data) => {
        const { name, userId, roomId, host, presenter } = data
        socket.join(roomId)
        const users = addUser({ name, userId, roomId, host, presenter, socketId: socket.id })
        socket.emit("userIsJoined", { success: true, users })
        socket.broadcast.to(roomId).emit("userIsJoinedMessage", name)
        socket.broadcast.to(roomId).emit("allUsers", users)

        // Send latest whiteboard snapshot for this room (if any)
        const latestImage = roomImages[roomId]
        if (latestImage) {
            socket.emit("whiteBoardDataResponse", { imageURL: latestImage })
        }

        socket.emit("chatHistory", roomMessages[roomId] || [])
    })

    socket.on("whiteboardData", ({ roomId, imageURL }) => {
        if (!roomId || !imageURL) {
            return
        }
        roomImages[roomId] = imageURL
        socket.broadcast.to(roomId).emit("whiteBoardDataResponse", { imageURL })
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

const port = process.env.PORT || 4000
server.listen(port,()=> console.log(`Server is running on port ${port}`))