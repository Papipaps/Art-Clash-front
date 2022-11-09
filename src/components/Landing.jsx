import { Link } from "react-router-dom";
import "../styles/Landing.css";
export default function Landing() {
  return (
    <div className="landing">
      <ul className="landing-menu">
        <h1>BIENVENUE</h1>
        <li>
          <Link className="link-home" to="/login">
            Connexion
          </Link>
        </li>
        <li>
          <Link className="link-minigame" to="/minigame">
            Accéder aux mini-jeux
          </Link>
        </li>
      </ul>
    </div>
  );
}
