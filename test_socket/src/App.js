import "./App.css";
import io from "socket.io-client";
import React, { Fragment } from "react";
function App() {
  const socket = io.connect("http://localhost:4000");
  const [mes, setMes] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [receiveMes, setReceiveMes] = React.useState([]);
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    socket.on("receive-mes", (data) => {
      setReceiveMes((prev) => [...prev, data]);
    });
  }, [socket]);

  console.log(receiveMes);
  const onClickSend = () => {
    socket.emit("send-chat", { mes, room, name });
    setMes("")
  };

  const onClickJoin = () => {
    if (room !== "") {
      socket.emit("join-room", room);
    }
  };

  return (
    <div>
       Name: <input value={name} onChange={(e) => setName(e.target.value)} />
      
      <br />
      Room: <input value={room} onChange={(e) => setRoom(e.target.value)} />
      <button type="submit" onClick={onClickJoin}>
        Join room
      </button>
      <br />
      Mess: <input value={mes} onChange={(e) => setMes(e.target.value)} />
      <button type="submit" onClick={onClickSend}>
        Send
      </button>
      <br />
      Room:{room}
      <br/>
      Name:{name}
      <br/>
      Message: 
      {receiveMes?.map((data, index) => (
        <Fragment key={index}>
          <p>
            Phòng: {data.room} - {data.name} say : {data?.mes}
          </p>
        </Fragment>
      ))}
    </div>
  );
}

export default App;
