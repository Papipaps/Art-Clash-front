import { Link } from "react-router-dom";
import { FiGithub, FiGrid, FiUser, FiX } from "react-icons/fi";

export default function Sidebar() {
  return (
    <nav>
      <div className="fixed place-content-evenly top-0 left-0 h-screen w-16 flex flex-col bg-white shadow-lg shadow-yellow-400 ">
        <Link to="/home">
          <SidebarIcon icon={<FiGrid size="18" />} text="Document" />
        </Link>

        <Link to="/profil">
          <SidebarIcon icon={<FiUser size="20" />} text="Profil" />
        </Link>

        <a href="https://github.com/Papipaps">
          <SidebarIcon icon={<FiGithub size="20" />} text="Github" />
        </a>

        <Link to="/">
          <SidebarIcon icon={<FiX size="20" />} text="Quitter" />
        </Link>
      </div>
    </nav>
  );
}

function SidebarIcon({ icon, text }) {
  console.log(text);
  return (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
}
