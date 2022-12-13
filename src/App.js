import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Profil from "./components/Profil";
import Home from "./components/Home";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Gallery from "./components/Gallery";
import ErrorPage from "./components/ErrorPage";
import AuthService from "./service/auth-service";
import ProfilEdit from "./components/Profil.Edit";
import MiniGame from "./components/minigame/MiniGame";
import UnderConstruction from "./components/UnderConstruction";
import { useEffect, useState } from "react";
import FreeDrawing from "./components/minigame/freedrawing.component";
import GuessGame from "./components/minigame/guessgame.component";
import Lobby from "./components/minigame/Lobby";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute component={<Login />} />} />
      <Route
        path="/register"
        element={<PublicRoute component={<Register />} />}
      />

      <Route path="/home" element={<ProtectedRoute component={<Home />} />} />
      <Route
        path="/profil"
        element={<ProtectedRoute component={<Profil />} />}
      />
      <Route
        path="/profil/:username"
        element={<ProtectedRoute component={<Profil />} />}
      />
      <Route
        path="/profil-edit"
        element={<ProtectedRoute component={<ProfilEdit />} />}
      />
      <Route path="/minigame" element={<MiniGame />} />
      <Route path="/minigame/GuessGame" element={<UnderConstruction />} />
      <Route path="/minigame/FreeDrawing" element={<UnderConstruction />} />
      {/* <Route path="/minigame/Lobby/:gameid" element={<Lobby />} /> */}
      <Route
        path="/gallery"
        element={<ProtectedRoute component={<Gallery />} />}
      />

      <Route
        path="*"
        element={<ProtectedRoute component={<Navigate to="/login" />} />}
      />
    </Routes>
  );
}

const ProtectedRoute = ({ component }) => {
  // console.log("prot");
  const user = AuthService.getCurrentUser();
  if (user == null) {
    // console.log("prot 2");
    return <Navigate to="/login" replace />;
  }
  return component;
};

const PublicRoute = ({ component }) => {
  // console.log("public");
  const user = AuthService.getCurrentUser();
  if (user != null) {
    // console.log("public 2");
    return <Navigate to="/home" />;
  }
  return component;
};

export default App;
