import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Profil from "./components/Profil";
import Home from "./components/Home";
import Landing from "./components/Landing";

function App() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
