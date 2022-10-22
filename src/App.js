import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Profil from "./components/Profil";
import Home from "./components/Home";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import MiniGame from "./components/MiniGame";
import Gallery from "./components/Gallery";

function App() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/minigame" element={<MiniGame />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
