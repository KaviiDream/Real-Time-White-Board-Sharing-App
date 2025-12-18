const express = require("express")
const app = express() 

const server = require("http").createServer(app)
const {Server} = require("socket.io")

const io = new Server (server)

//routes
app.get("/",(req,res)=>{
    res.send("This is MERN Real-Time Whire Board By Kavindu")
    }
)

let roomIdGlobal,imageURLGlobal;

io.on("connection",(socket)=>{
    socket.on("joinRoom",(data)=>{
        const {name, userId, roomId, host, presenter} = data;
        roomIdGlobal = roomId;
        socket.join(roomId);
        socket.emit("userIsJoined", {success:true})
        socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {imageURL: imageURLGlobal});
    })

    socket.on("whiteboardData",(data)=>{
        imageURLGlobal = data;
        socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", {imageURL: data});
    })
})

const port = process.env.PORT || 5000
server.listen(port,()=> console.log(`Server is running on port ${port}`))