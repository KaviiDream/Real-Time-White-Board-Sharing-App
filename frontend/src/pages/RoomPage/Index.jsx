import React from 'react'
import "./index.css"
import { useState,useRef } from 'react';
import WhiteBoard from '../../component/Whiteboard/Index';

const RoomPage = () => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [tool,setTool]=useState("pencil");
    const [color,setColor]=useState("black");
    const [elements,setElements]=useState([]);


  return (
    <div className="row">
        <div className="col-12 col-md-8 offset-md-2 align-items-center justify-content-center d-flex flex-column">
            <h2 className="text-center mt-4 pt-4 py-4">Real Time White Board <span className="text-primary">[Users Online : 0]</span></h2>
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
                    <button className="btn btn-primary mt-1">Undo</button>
                    <button className="btn btn-outline-primary mt-1">Redo</button>

                </div>

                <div className="col-md-2 d-flex gap-2 ml-6">
                    <button className="btn btn-danger mt-1">Clear Canvas</button>
                </div>

            </div>

        </div>

        <div className="col-md-10 mx-auto mt-4 canvas-box">
            <WhiteBoard canvasRef={canvasRef} ctxRef={ctxRef} 
            elements={elements} setElements={setElements}
            tool={tool} />
        </div>
    </div>
  )
}

export default RoomPage
