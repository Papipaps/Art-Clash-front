import { Link } from "react-router-dom";
import { FiGithub, FiGrid, FiUser, FiX, FiHome } from "react-icons/fi";
import { CgController } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/auth-service";

const Github_icon = FiGithub;
const Profil_icon = FiUser;
const Gallery_icon = FiGrid;
const Minigame_icon = CgController;
const Home_icon = FiHome;
const Quit_icon = FiX;

function SidebarIcon({ icon, text }) {
  return (
    <div className="lg:relative sidebar-icon group">
      <i className="lg:absolute lg:left-[50px] fa fa-home lg:mr-2">{icon}</i>
      {/* DESKTOP */}
      <span className="lg:absolute lg:left-[100px] hidden lg:block  lg:text-left">
        {text}
      </span>
      {/* RESPONSIVE */}
      <span className="sidebar-tooltip lg:hidden  group-hover:scale-100 z-10">
        {text}
      </span>
    </div>
  );
}

function Tabs() { 
  const navigate = useNavigate();
  return (
    <div className=" sm:p-4 lg:p-0 min-w-fit w-full sm:h-full flex sm:flex-col justify-evenly">
      <Link className="sidebar-item" to="/home">
        <SidebarIcon icon={<Home_icon size="25" />} text="Accueil" />
      </Link>
      <Link className="sidebar-item" to="/profil">
        <SidebarIcon icon={<Profil_icon size="25" />} text="Profil" />
      </Link>
      <Link className="sidebar-item" to="/clash">
        <SidebarIcon icon={<Gallery_icon size="25" />} text="Clash" />
      </Link> 
      <a
        className="sidebar-item"
        href="https://github.com/Papipaps"
        target="_blank"
      >
        <SidebarIcon icon={<Github_icon size="25" />} text="Github" />
      </a>

      <div
        className="sidebar-item"
        onClick={() => {
          AuthService.logout();
          navigate("/login");
        }}
      >
        <SidebarIcon icon={<Quit_icon size="25" />} text="Déconnexion" />
      </div>
    </div>
  );
}

export default function Sidebar({ children }) {

  return (
    <main className="w-screen h-screen bg-white">
      {/* MOBILE */}
      <div className="sm:hidden z-50 w-full bg-white bg-opacity-70 rounded-t-3xl fixed  bottom-0">
        <Tabs />
      </div>
      {/* DESKTOP */}
      <div className="hidden sm:block z-50 rounded-t-3xl sm:rounded-none sm:bg-transparent fixed sm:top-0 sm:left-0 sm:h-full lg:w-[250px] shadow-md shadow-orange-300 drop-shadow-lg ">
        <Tabs />
      </div>
      <div className="main-content overflow-x-hidden">{children}</div>
    </main>
  );
}
