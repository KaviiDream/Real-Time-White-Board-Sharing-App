import React from 'react'
import "./index.css"
import { useState,useRef,useEffect } from 'react';
import WhiteBoard from '../../component/Whiteboard/Index';

const RoomPage = ({user,socket, users}) => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [tool,setTool]=useState("pencil");
    const [color,setColor]=useState("black");
    const [elements,setElements]=useState([]);
    const [history,setHistory]=useState([]);
    const [openedUserTab,setOpenedUserTab]=useState(false);


    const handleClearCanvas = () =>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
        setElements([]);
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
        <button type='button' className='btn btn-dark'
        style={{display:"block", position:"absolute", top:"5%",left:"1%",height:"40px",width:"100px"}} onClick={()=> setOpenedUserTab(true)}>Users</button>

        {openedUserTab && (
            <div className="position-fixed top-0 h-100 text-white bg-dark" style={{width:"250px",left:"0%"}}>
                <button type='button' className='btn btn-light btn-block w-100 mt-5' onClick={()=>setOpenedUserTab(false)}>Close</button>

                <div className='w-100 mt-5  pt-2'>
                {
                    users.map((usr,index)=>
                        <p key={index*999} className='my-2 w-100'>{usr.name}
                        {usr && usr.userId === user.userId && (<span className='text-primary'> (You)</span>
                        )}
                        </p>
                )}
                </div>
            </div>
        )}

        <div className="col-12 col-md-8 offset-md-2 align-items-center justify-content-center d-flex flex-column">
            <h2 className="text-center mt-4 pt-4 py-4">Real Time White Board <span className="text-primary">[Users Online : {users.length}]</span></h2>

            {
                user?.presenter &&(
                    <div className="col-md-9 mt-4 mb-5 d-flex align-items-center justify-content-around border rounded p-3 canvas-container gap-2 mx-auto mb-3">
                <div className="d-flex col-md-4 justify-content-between gap-4">

                    <div className="d-flex gap-1">
                        <label htmlFor="pencil">Pencil</label>
                        <input type='radio' name="tool" value="pencil" id="pencil" checked={tool === "pencil"} onChange={(e)=>setTool(e.target.value)}/>
                    </div>
                    <div className="d-flex gap-1">
                        <label htmlFor="line">Line</label>
                        <input type='radio' name="tool" value="line" id="line" checked={tool === "line"} onChange={(e)=>setTool(e.target.value)}/>
                    </div>
                    <div className="d-flex gap-1">
                        <label htmlFor="rect">Rectangle</label>
                        <input type='radio' name="tool" value="rect" id="rect" checked={tool === "rect"} onChange={(e)=>setTool(e.target.value)}/>
                    </div>

                </div>

                <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <label htmlFor="color">Select Color</label>
                        <input type="color" id="color" name="color" className="mt-1" value={color} onChange={(e)=>setColor(e.target.value)}/>
                    </div>
                </div>

                <div className="col-md-3 d-flex gap-2">
                    <button className="btn btn-primary mt-1" disabled={elements.length === 0} onClick={()=> undo()}>Undo</button>
                    <button className="btn btn-outline-primary mt-1" disabled={history.length < 1} onClick={() => redo()}>Redo</button>

                </div>

                <div className="col-md-2 d-flex gap-2 ml-6">
                    <button className="btn btn-danger mt-1" onClick={handleClearCanvas}>Clear Canvas</button>
                </div>

                    </div>

                )
            }

            

        </div>

        <div className="col-md-10 mx-auto mt-4 canvas-box">
            <WhiteBoard canvasRef={canvasRef} ctxRef={ctxRef} 
            elements={elements} setElements={setElements}
            color={color} tool={tool} user={user} socket={socket}/>
        </div>
    </div>
  )
}

export default RoomPage
