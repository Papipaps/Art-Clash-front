// import io from "socket.io-client";
// import { useState, useEffect } from "react";
// import mockProfils from "../../mock/mock-profils";
// const socket = io.connect("http://localhost:3001");

// export default function Lobby() {
//   const [username, setUsername] = useState("");
//   const [room, setRoom] = useState("");

//   const joinRoom = () => {
//     if (username !== "" && room !== "") {
//       socket.emit("join-room", room);
//     }
//   };

//   return (
//     <div className="p-4">
//       <label>username :</label>
//       <input
//         type={"text"}
//         placeholder={"username..."}
//         onChange={(e) => setUsername(e.target.value)}
//       ></input>
//       <label>room:</label>
//       <input
//         type={"text"}
//         placeholder={"room..."}
//         onChange={(e) => setRoom(e.target.value)}
//       ></input>
//       <button onClick={joinRoom}>REJOINDRE</button>
//     </div>
//   );
// }
