import { Link } from "react-router-dom";
import { FiGithub, FiGrid, FiUser, FiX, FiHome } from "react-icons/fi";
import { CgController } from "react-icons/cg";
import { useNavigate, redirect } from "react-router-dom";
import AuthService from "../service/auth-service";

const Github_icon = FiGithub;
const Profil_icon = FiUser;
const Gallery_icon = FiGrid;
const Minigame_icon = CgController;
const Home_icon = FiHome;
const Quit_icon = FiX;

export default function Sidebar() {
  const navigate = useNavigate();
  function logout() {
    AuthService.logout();
    navigate("/login");
  }
  return (
    <nav>
      <div className="fixed place-content-evenly top-0 left-0 min-h-screen w-16 flex flex-col bg-white border border-yellow-400 ">
        <Link to="/home">
          <SidebarIcon icon={<Home_icon size="18" />} text="Accueil" />
        </Link>

        <Link to="/profil">
          <SidebarIcon icon={<Profil_icon size="20" />} text="Profil" />
        </Link>

        <Link to="/gallery">
          <SidebarIcon icon={<Gallery_icon size="20" />} text="Gallerie" />
        </Link>

        <Link to="/minigame">
          <SidebarIcon icon={<Minigame_icon size="20" />} text="Mini-Jeux" />
        </Link>

        <a href="https://github.com/Papipaps" target="_blank">
          <SidebarIcon icon={<Github_icon size="20" />} text="Github" />
        </a>

        <div onClick={logout}>
          <SidebarIcon icon={<Quit_icon size="20" />} text="Déconnexion" />
        </div>
      </div>
    </nav>
  );
}

function SidebarIcon({ icon, text }) {
  return (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
}
