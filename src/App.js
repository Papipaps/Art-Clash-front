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
import UnderConstruction from "./components/UnderConstruction";
function App() {
  // const user = AuthService.getCurrentUser();
  const user = AuthService.getMockUser();
  return (
    <Routes>
      <Route
        path={"/"}
        element={<PublicRoute user={user} component={<Login />} />}
      />
      <Route
        path={"/login"}
        element={<PublicRoute user={user} component={<Login />} />}
      />
      <Route
        path="/register"
        element={<PublicRoute user={user} component={<Register />} />}
      />

      <Route
        path="/home"
        element={<ProtectedRoute user={user} component={<Home />} />}
      />
      <Route
        path="/profil"
        element={<ProtectedRoute user={user} component={<Profil />} />}
      />
      <Route
        path="/profil-edit"
        element={<ProtectedRoute user={user} component={<ProfilEdit />} />}
      />
      <Route path="/minigame" element={<UnderConstruction />} />
      <Route
        path="/gallery"
        element={<ProtectedRoute user={user} component={<Gallery />} />}
      />

      <Route
        path="*"
        element={<ProtectedRoute user={user} component={<ErrorPage />} />}
      />
      <Route
        path="/logout"
        element={<PublicRoute user={user} component={<Landing />} />}
      />
    </Routes>
  );
}

const ProtectedRoute = ({ user, component }) => {
  if (user == null) {
    return <Navigate to="/login" replace />;
  }
  return component;
};

const PublicRoute = ({ user, component }) => {
  if (user != null) {
    return <Navigate to="/home" />;
  }
  return component;
};

export default App;
