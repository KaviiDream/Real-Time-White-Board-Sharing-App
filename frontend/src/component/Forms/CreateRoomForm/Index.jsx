const CreateRoomForm = ()=>{

    return(
        <form className="form col-md-12 mt-5">
            <div className="form-group">
                <input type="text" className="form-controll my-2" placeholder="Enter Your Name" />
            </div>
            <div className="form-group border">
                <div className="input-group d-flex align-items-center justify-content-center">
                    <input type="text" className="form-controll my-2 border-0" placeholder="Generate Room Code" disabled/>

                    <div className="input-group-append d-flex gap-1 py-2">
                        <button className="btn btn-primary btn-sm my-2 me-1" type="button">Generate</button>
                        <button className="btn btn-outline-danger btn-sm my-2 me-1" type="button">Copy</button>
                    </div>
                </div>
            </div>
            <button type="submit" className="mt-4 btn-primary btn-block form-control">Create Room</button>
        </form>
    )

}


export default CreateRoomForm;