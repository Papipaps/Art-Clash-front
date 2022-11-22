import { useState, useEffect } from "react";
import defaultBackgroundImage from "../media/images/defaultbgimage.webp";
import Sidebar from "./Sidebar";
import Community from "./Community";
import Project from "./Project";
import Contact from "./Contact";
import "../styles/UserProfil.css";
import "../styles/Popup.css";
import GalleryGrid from "./GalleryGrid";
import ProfileService from "../service/profil.service";
import profilDTO from "../data/dto/profilDTO";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import data from "../mock/mock-profils";
import defaultavatar from "../media/images/avatar.jpg";
import Popup from "./Popup";
let profil = profilDTO;

export default function Profil() {
  const [currentProfil, setCurrentProfil] = useState(data[0]);
  const [isLoaded, setIsLoading] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [tabComponent, setTabComponent] = useState(<GalleryGrid />);
  const navigate = new useNavigate();

  const toggleAbout = () => {
    setPopupOpen(!isPopupOpen);
  };
  const toggleTabComponent = (prop) => {
    const component = prop.type.name;
    if (component === "GalleryGrid") {
      setTabComponent(<GalleryGrid />);
    } else if (component === "Project") {
      setTabComponent(<Project />);
    } else if (component === "Community") {
      setTabComponent(<Community />);
    } else if (component === "Contact") {
      setTabComponent(<Contact />);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    //window.scrollTo(0, 0);
    //ProfileService.getPublicContent().then((response) => {
    //  setCurrentProfil(response.data);
    //  if (response.status === 200) {
    //    setIsLoading(true);
    //  }
    //});
  }, []);
  return (
    <>
      <Sidebar />

      {isLoaded && (
        <div className="bg-slate-50 flex justify-center  w-full mb-4 h-screen">
          {isPopupOpen && (
            <Popup setPopupOpen={setPopupOpen}>
              <div className="flex justify-evenly gap-4">
                <button
                  className="relative left-0 top-0 w-10 h-10 border-black border"
                  onClick={() => {
                    toggleAbout(isPopupOpen);
                  }}
                >
                  X
                </button>{" "}
                <p>
                  Suivez moi sur insta !!! 😙
                  <a
                    className="underline underline-offset-2 font-boldbold"
                    href="http://instagram.com/drw_paps"
                    target="_blank"
                  >
                    @Drw_Paps
                  </a>
                </p>
              </div>
            </Popup>
          )}
          <div className="ml-16 flex flex-col min-w-fit break-words bg-white h-full w-full   ">
            {/* PROFIL INFO CARD */}
            <div
              style={{ backgroundImage: `url(${defaultBackgroundImage})` }}
              className={`profile-info py-4  text-center min-h-[400px] h-[400px]`}
            >
              <div className="flex flex-wrap justify-center text-white">
                <div className="border border-white h-[250px] w-[250px]">
                  {" "}
                  <img src={defaultavatar} alt="" srcset="" />
                </div>
                <div className="profil-primary w-full">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                    {!currentProfil.firstname || currentProfil.anonymous
                      ? currentProfil.username
                      : currentProfil.firstname + " " + currentProfil.lastname}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2  font-bold uppercase">
                    {currentProfil.country} based {currentProfil.category}
                  </div>
                </div>
              </div>
            </div>
            {/* PROFIL CONNECT */}
            <div className="w-full   text-center flex justify-center gap-12  px-12 py-6">
              <p className="mb-4  w-[700px] max-h-[150px] overflow-hidden self-center text-justify  ">
                {currentProfil.description
                  ? "Bio : " + currentProfil.description
                  : "Cet utilisateur n'a pas de bio.. 😅"}
              </p>
              <Button
                className="relative right-0 top-0 h-[50px] w-[100px]"
                onClick={toggleAbout}
                style={{ border: "2px solid" }}
                color="secondary"
              >
                <p className="font-bold">A propos</p>
              </Button>
            </div>
            <span className="flex justify-center gap-[300px]  ">
              <Button
                className="h-[50px] w-[300px]"
                onClick={() => {
                  navigate("/profil-edit");
                }}
                style={{ border: "2px solid" }}
                color="primary"
              >
                <p className="font-bold">Modifier votre profil</p>
              </Button>
            </span>
            {/* PROFIL TAB CONTENT */}
            <div className="profil-content-tab  relative flex justify-around">
              <div
                className={`profil-content-tab-items ${
                  tabComponent.type.name === "GalleryGrid"
                    ? "tab-active-items"
                    : ""
                } `}
              >
                <button
                  onClick={() => {
                    toggleTabComponent(<GalleryGrid />);
                  }}
                >
                  {" "}
                  Gallerie
                </button>
              </div>
              <div
                className={`profil-content-tab-items ${
                  tabComponent.type.name === "Project" ? "tab-active-items" : ""
                }`}
              >
                <button
                  onClick={() => {
                    toggleTabComponent(<Project />);
                  }}
                >
                  {" "}
                  Projets
                </button>
              </div>

              <div
                className={`profil-content-tab-items ${
                  tabComponent.type.name === "Community"
                    ? "tab-active-items"
                    : ""
                }`}
              >
                <button
                  onClick={() => {
                    toggleTabComponent(<Community />);
                  }}
                >
                  {" "}
                  Communauté
                </button>
              </div>
              <div
                className={`profil-content-tab-items ${
                  tabComponent.type.name === "Contact" ? "tab-active-items" : ""
                }`}
              >
                <button
                  onClick={() => {
                    toggleTabComponent(<Contact />);
                  }}
                >
                  {" "}
                  Contact
                </button>
              </div>
            </div>
            {/* PROFIL CONTENT */}
            <div className="">{tabComponent}</div>
          </div>
        </div>
      )}
    </>
  );
}
