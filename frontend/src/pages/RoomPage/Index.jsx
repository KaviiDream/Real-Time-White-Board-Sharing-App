import React from 'react'
import "./index.css"
import { useState } from 'react';

const RoomPage = () => {

    const [tool,setTool]=useState("pencil");
    const [color,setColor]=useState("black");


  return (
    <div className="row">
        <div className="col-12 col-md-8 offset-md-2 align-items-center justify-content-center d-flex flex-column">
            <h2 className="text-center mt-4 py-5">Real Time White Board</h2>
            <div className="col-md-8 mt-4 mb-5 d-flex align-items-center justify-content-around border rounded p-3 canvas-container gap-2 mx-auto">
                <div className="d-flex col-md-4 justify-content-between gap-4">

                    <div className="d-flex gap-1">
                        <label for="pencil">Pencil</label>
                        <input type='radio' name="tool" value="pencil" id="pencil" onChange={(e)=>setTool(e.target.value)}/>
                    </div>
                    <div className="d-flex gap-1">
                        <label for="line">Line</label>
                        <input type='radio' name="tool" value="line" id="line" onChange={(e)=>setTool(e.target.value)}/>

                    </div>
                    <div className="d-flex gap-1">
                        <label for="rect">Rectangle</label>
                        <input type='radio' name="tool" value="rect" id="rect" onChange={(e)=>setTool(e.target.value)}/>

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
                    <button className="btn btn-outline-primary mt-1">Undo</button>

                </div>

                <div className="col-md-2">
                    <button className="btn btn-danger">Clear Canvas</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default RoomPage
