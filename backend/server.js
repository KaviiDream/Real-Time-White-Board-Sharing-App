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


io.on("connection",(socket)=>{
    socket.on("joinRoom",(data)=>{
        const {name, userId, roomId, host, presenter} = data;
        socket.join(roomId);
        socket.emit("userIsJoined", {success:true})
    })
})

const port = process.env.PORT || 5000
server.listen(port,()=> console.log(`Server is running on port ${port}`))