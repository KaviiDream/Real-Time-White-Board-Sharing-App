
import './App.css';

function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="kicker">Collaborative canvas</p>
        <h1>Real-Time Whiteboard</h1>
        <p className="subhead">
          Sketch flows, brainstorm ideas, and iterate with your team without waiting for a build.
        </p>
        <button type="button" className="cta-button">Start sketching</button>
      </section>
      <section className="canvas-preview" aria-label="Canvas preview placeholder">
        <div className="grid-overlay" />
        <p>Interactive canvas coming soon</p>
      </section>
    </main>
  );
}

export default App;
