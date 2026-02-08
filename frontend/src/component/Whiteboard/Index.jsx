import React from 'react'
import rough from "roughjs"
import { useEffect,useState, useLayoutEffect } from 'react'
import "./Index.css"

const roughGenerator = rough.generator();


const WhiteBoard = ({
    canvasRef,
    ctxRef,
    elements,
    setElements,
    tool,
    color,
    user,
    socket
}) => {

    const [img,setImg] = useState(null);

   useEffect(()=>{
    const handleWhiteboardData = (data)=>{
        setImg(data.imageURL);
    }
    socket.on("whiteBoardDataResponse", handleWhiteboardData);
    return () => socket.off("whiteBoardDataResponse", handleWhiteboardData);
    },[socket]);

    if(!user?.presenter){
    return (
        <div className="whiteboard-view-only">
            <img src={img} alt="Real time white board image shared by presenter" />
        </div>
    )
  }


   const [drawing, setIsDrawing] = useState(false);
    


    useEffect(()=>{

        const canvas = canvasRef.current;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);

        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.lineCap = "round"

        ctxRef.current = ctx;

    },[]);




  useEffect(()=>{
    ctxRef.current.strokeStyle = color;
  },[color]);

  useLayoutEffect(()=>{
    if(canvasRef){
    const roughCanvas = rough.canvas(canvasRef.current);
    
    if(elements.length>0){
        ctxRef.current.clearRect(0,0, canvasRef.current.width, canvasRef.current.height);
    }
    
    elements.forEach((elements) =>{

        if(elements.type==="rect"){
            roughCanvas.draw(
            roughGenerator.rectangle(elements.offsetX,elements.offsetY,elements.width,elements.height,{stroke: elements.stroke,strokeWidth: 5,roughness:0})
            );
        }
        else if(elements.type==="line"){
            
            roughCanvas.draw(
            roughGenerator.line(elements.offsetX,elements.offsetY,elements.width,elements.height,{stroke: elements.stroke,strokeWidth: 5,roughness:0})
            );
        }
        else if(elements.type==="pencil"){
            roughCanvas.linearPath(elements.path,{stroke: elements.stroke,strokeWidth: 5,roughness:0});
        }
        
    })

    const canvasImage = canvasRef.current.toDataURL();
    socket.emit("whiteboardData",{roomId: user?.roomId, imageURL: canvasImage})

    }
  },[elements]);


  const handleMouseDown = (e) => {
    //console.log("Mouse Down",e);

    const {offsetX,offsetY}=e.nativeEvent;
    
    if(tool === "pencil"){
        setElements((prevElements)=>[
            ...prevElements,
            {type:"pencil",offsetX,offsetY,path: [[offsetX,offsetY]], stroke:color}
        ]);
    }
    else if(tool==="line"){
        setElements((prevElements)=> [
            ...prevElements,
            {
            type:"line",
            offsetX,
            offsetY,
            width: offsetX,
            height: offsetY,
            stroke: color
            }
        ])
    }

    else if(tool === "rect"){
        setElements((prevElements)=>[
            ...prevElements,
            {type:"rect",offsetX,offsetY,width:0,height:0, stroke:color}
        ]);
    }
    else {
        return ele;
    }


    setIsDrawing(true);

  }

  const handleMouseMove = (e) => {
    //console.log("Mouse Move",e);

    const {offsetX,offsetY}=e.nativeEvent;

    if(drawing){
        //pencil by default
        if(tool === "pencil"){
        const {path} = elements[elements.length - 1];
        const newPath = [...path, [offsetX,offsetY]];

        
            setElements((prevElements)=>
                prevElements.map((ele, index) => {
                    if(index === elements.length - 1){
                        return {...ele, path:newPath};
                    }
                    else{
                        return ele
                    }
                })
            );
        }
        else if(tool==="line"){
            setElements((prevElements)=>
                prevElements.map((ele, index) => {
                    if(index === elements.length - 1){
                        return {...ele, width: offsetX, height: offsetY};
                    }
                    else{
                        return ele
                    }
                })
            );

        }
        else if(tool==="rect"){
            setElements((prevElements)=>
                prevElements.map((ele, index) => {
                    if(index === elements.length - 1){
                        return {...ele, width: offsetX - ele.offsetX, height: offsetY - ele.offsetY};
                    }
                    else{
                        return ele
                    }
                })
            );
        }
    }
}

  const handleMouseUp = (e) => {
    //console.log("Mouse Up",e);

    setIsDrawing(false);
  }

  

    return (

        <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className="whiteboard-shell">

     <canvas ref={canvasRef}/>

        </div>
    
    )

}

export default WhiteBoard
