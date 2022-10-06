import "./App.css";
import io from "socket.io-client";
function App() {
  const socket = io.connect("http://localhost:4000");

  const setStatus = () => {
    socket.emit("send-status", "success");
  };

  return (
    <div className="App">
      <button onClick={setStatus}>ChangeStatus</button>
    </div>
  );
}

export default App;
