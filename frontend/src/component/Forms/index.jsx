
import CreateRoomForm from "./CreateRoomForm/Index";
import JoinRoomForm from "./JoinRoomForm/Index";
import "./index.css";

const Forms = ({ uuid, socket, setUser }) => {
    return (
        <div className="app-shell">
            <section className="hero">
                <p className="kicker">Real-time workspace</p>
                <h1>Host, share, and co-create on a clean white canvas.</h1>
                <p className="subhead">Spin up a room in seconds, invite collaborators, chat live, and sketch together with zero friction.</p>
                <button className="cta-button" onClick={() => window.scrollTo({ behavior: "smooth", top: 520 })}>Start a room</button>
            </section>

            <section className="forms-stack" id="forms">
                <div className="form-card">
                    <h2>🎨 Create a room</h2>
                    <p>Generate a fresh space for your team and start presenting instantly.</p>
                    <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
                </div>

                <div className="form-card">
                    <h2>🤝 Join a room</h2>
                    <p>Drop into an existing session with the shared code from your host.</p>
                    <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} />
                </div>
            </section>
        </div>
    );
};

export default Forms;