import React from 'react'
import "./index.css"
import { useState,useRef,useEffect } from 'react';
import WhiteBoard from '../../component/Whiteboard/Index';

const RoomPage = ({user,socket, users}) => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const chatEndRef = useRef(null);

    const [tool,setTool]=useState("pencil");
    const [color,setColor]=useState("black");
    const [elements,setElements]=useState([]);
    const [history,setHistory]=useState([]);
    const [openedUserTab,setOpenedUserTab]=useState(false);
    const [isChatOpen, setIsChatOpen] = useState(true);
    const [messages,setMessages]=useState([]);
    const [messageText,setMessageText]=useState("");

    useEffect(()=>{
        const handleChatHistory = (history = []) => {
            setMessages(history);
        };

        const handleNewMessage = (incomingMessage) => {
            setMessages((prev)=>[...prev, incomingMessage]);
        };

        socket.on("chatHistory", handleChatHistory);
        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("chatHistory", handleChatHistory);
            socket.off("newMessage", handleNewMessage);
        };
    },[socket]);

    useEffect(()=>{
        chatEndRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages]);


    const handleClearCanvas = () =>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
        setElements([]);
    }

    const handleSendMessage = (e) =>{
        e.preventDefault();
        if(!user?.roomId || !messageText.trim()){
            return;
        }
        socket.emit("sendMessage", {
            roomId: user.roomId,
            userId: user.userId,
            message: messageText.trim()
        });
        setMessageText("");
    }

    const formatTimestamp = (timestamp) => {
        if(!timestamp){
            return "";
        }
        try {
            return new Date(timestamp).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
        } catch (error) {
            return "";
        }
    }

    const undo = () =>{
        setHistory((prevHistory)=>[...prevHistory, elements[elements.length -1]]);
        setElements((prevElements)=> prevElements.slice(0, prevElements.length -1));
    }

    const redo = () =>{
        const newElements = [...elements, history[history.length -1]];
        setElements(newElements);
        setHistory((prevHistory)=> prevHistory.slice(0, prevHistory.length -1));
    }


  return (
    <div className="row">
        {/* Users Sidebar */}
        <div className={`users-sidebar ${openedUserTab ? 'open' : ''}`}>
            <div className="users-sidebar-header">
                <h3>Team Members</h3>
                <button onClick={() => setOpenedUserTab(false)}>Close</button>
            </div>
            <div className="users-list">
                {users.map((usr, index) => (
                    <div key={index * 999} className={`user-item ${usr.userId === user?.userId ? 'you' : ''}`}>
                        <div className="user-avatar">{usr.name.charAt(0).toUpperCase()}</div>
                        <span>
                            {usr.name}
                            {usr.userId === user?.userId && <span className="text-primary"> (You)</span>}
                        </span>
                    </div>
                ))}
            </div>
            <div className="users-count">{users.length} participant{users.length !== 1 ? 's' : ''}</div>
        </div>

        {/* Main Content */}
        <div className="main-content">
            {/* Header */}
            <div className="room-header">
                <h2 className="room-title">Real Time Whiteboard</h2>
                <div className="room-info">
                    <div className="user-count-badge">
                        👥 {users.length} Online
                    </div>
                    <button className="toggle-users-btn" onClick={() => setOpenedUserTab(true)}>
                        View Team
                    </button>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="canvas-box">
                <WhiteBoard canvasRef={canvasRef} ctxRef={ctxRef} 
                elements={elements} setElements={setElements}
                color={color} tool={tool} user={user} socket={socket}/>
            </div>

            {/* Control Toolbar */}
            {user?.presenter && (
                <div className="canvas-container">
                    <div className="tool-group">
                        <label htmlFor="pencil">
                            <input type='radio' name="tool" value="pencil" id="pencil" checked={tool === "pencil"} onChange={(e) => setTool(e.target.value)} />
                            ✏️ Pencil
                        </label>
                        <label htmlFor="line">
                            <input type='radio' name="tool" value="line" id="line" checked={tool === "line"} onChange={(e) => setTool(e.target.value)} />
                            📏 Line
                        </label>
                        <label htmlFor="rect">
                            <input type='radio' name="tool" value="rect" id="rect" checked={tool === "rect"} onChange={(e) => setTool(e.target.value)} />
                            ◻️ Rectangle
                        </label>
                    </div>

                    <div className="tool-group color-picker">
                        <label htmlFor="color">Color</label>
                        <input type="color" id="color" name="color" value={color} onChange={(e) => setColor(e.target.value)} />
                    </div>

                    <div className="action-buttons">
                        <button className="btn-tool primary" disabled={elements.length === 0} onClick={() => undo()}>↶ Undo</button>
                        <button className="btn-tool secondary" disabled={history.length < 1} onClick={() => redo()}>↷ Redo</button>
                        <button className="btn-tool danger" onClick={handleClearCanvas}>🗑️ Clear</button>
                    </div>
                </div>
            )}

        <div className={`chat-shell ${isChatOpen ? "chat-shell--open" : "chat-shell--closed"}`}>
            <div className="chat-header">
                <div>
                    <p className="chat-kicker">💬 Chat</p>
                    <h3 className="chat-title">Room Chat</h3>
                </div>
                <button
                    type="button"
                    className="chat-toggle"
                    onClick={() => setIsChatOpen((prev) => !prev)}
                >
                    {isChatOpen ? "−" : "+"}
                </button>
            </div>

            {isChatOpen && (
            <>
            <div className="chat-log" role="log" aria-live="polite">
                {messages.length === 0 && (
                    <p className="chat-empty">Start the conversation 👋</p>
                )}
                {messages.map((msg)=> (
                    <div
                        key={`${msg.timestamp}-${msg.userId}-${msg.message}`}
                        className={`chat-message ${msg.userId === user?.userId ? "chat-message--self" : ""}`}
                    >
                        <div className="chat-meta">
                            <span className="chat-author">{msg.name || "Anonymous"}</span>
                            <span className="chat-time">{formatTimestamp(msg.timestamp)}</span>
                        </div>
                        <p className="chat-text">{msg.message}</p>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <form className="chat-form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    className="form-control chat-input"
                    placeholder={user ? "Type your message" : "Join the room to chat"}
                    value={messageText}
                    onChange={(e)=>setMessageText(e.target.value)}
                    disabled={!user}
                />
                <button type="submit" className="btn btn-primary" disabled={!messageText.trim() || !user}>
                    Send
                </button>
            </form>
            </>) }
        </div>
                </div>
        </div>
    )
}

export default RoomPage
