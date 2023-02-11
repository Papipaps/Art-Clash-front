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
        <i className="lg:absolute lg:left-[50px] fa fa-home lg:mr-2">
          {icon}
        </i> 
        {/* DESKTOP */}
        <span className="lg:absolute lg:left-[100px] hidden lg:block  lg:text-left">{text}</span>
        {/* RESPONSIVE */}
        <span className="sidebar-tooltip lg:hidden  group-hover:scale-100">{text}</span>
      </div> 
  );
}

export default function Sidebar({children}) {
  const navigate = useNavigate();
  function logout() {
    AuthService.logout();
    navigate("/login");
  }

  return ( 
    <main className="w-screen h-screen bg-white" >
      <div className="z-50 bg-transparent fixed top-0 left-0 h-full lg:w-[250px] shadow-md shadow-orange-300 drop-shadow-lg ">
        <div className="p-4 lg:p-0 min-w-fit w-full  h-full flex flex-col justify-evenly  "> 

          <Link className="sidebar-item" to="/home">
            <SidebarIcon icon={<Home_icon size="25" />} text="Accueil" />
          </Link> 
          <Link className="sidebar-item" to="/profil">
            <SidebarIcon icon={<Profil_icon size="25" />} text="Profil" />
          </Link>
          <Link className="sidebar-item" to="/clash">
            <SidebarIcon icon={<Gallery_icon size="25" />} text="Clash" />
          </Link> 

          {/* <Link className="sidebar-item" to="/minigame">
            <SidebarIcon icon={<Minigame_icon size="25" />} text="Mini-Jeux" />
          </Link> */}
          <a className="sidebar-item" href="https://github.com/Papipaps" target="_blank">
            <SidebarIcon icon={<Github_icon size="25" />} text="Github" />
          </a>

          <div className="sidebar-item" onClick={logout}>
            <SidebarIcon icon={<Quit_icon size="25" />} text="Déconnexion" />
          </div>

        </div>
      </div>  
      <div  className="main-content">
        {children}
      </div>
    </main>
  );
}
