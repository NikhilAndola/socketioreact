import * as React from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

console.log("socket", socket);

function App() {
  const [message, setMessage] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [messageReceived, setMessageReceived] = React.useState([
    {
      msg: "",
    },
  ]);

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  React.useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived((prev) => [...prev, { msg: data?.message }]);
    });
  }, [socket]);

  return (
    <div className="App">
      <div>
        <input onChange={(e) => setRoom(e.target.value)} placeholder="Room" />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <div>
        <input onChange={(e) => handleInput(e)} placeholder="message" />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <h1>Message:</h1>
      {messageReceived?.map((data, index) => (
        <div>
          <div>{data?.msg}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
