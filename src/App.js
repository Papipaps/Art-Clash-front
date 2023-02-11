import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Profil from "./components/Profil";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Clash from "./components/Clash";
import AuthService from "./service/auth-service";
import ProfilEdit from "./components/Profil.Edit";
import MiniGame from "./components/minigame/MiniGame";
import UnderConstruction from "./components/UnderConstruction";
import Sidebar from "./components/SidebarCopy";
import UserContext, { UserProvider } from "./utils/userContext";
import { useEffect, useState } from "react";
import ProfileService from "./service/profil.service";
import ClashEdit from "./components/Clash-Edit";
import ClashDetails from "./components/Clash-details";

function App() {
  return (
    <UserProvider>
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
        <Route
          path="/clash-edit"
          element={<ProtectedRoute component={<UnderConstruction />} />}
        />
        <Route path="/minigame" element={<MiniGame />} />
        <Route path="/minigame/GuessGame" element={<UnderConstruction />} />
        <Route path="/minigame/FreeDrawing" element={<UnderConstruction />} />
        {/* <Route path="/minigame/Lobby/:gameid" element={<Lobby />} /> */}
        <Route
          path="/clash"
          element={<ProtectedRoute component={<UnderConstruction />} />}
        />
        <Route
          path="/clash/:clashId"
          element={<ProtectedRoute component={<UnderConstruction />} />}
        />

        <Route
          path="*"
          element={<ProtectedRoute component={<Navigate to="/login" />} />}
        />
      </Routes>
    </UserProvider>
  );
}

const ProtectedRoute = ({ component }) => {
  const user = AuthService.getCurrentUser();
  if (user) {
    return component;
  }
  return <Navigate to="/login" replace />;
};

const PublicRoute = ({ component }) => {
  const user = AuthService.getCurrentUser();
  if (user) {
    return <Navigate to="/home" />;
  }
  return component;
};

export default App;
