import { useState, useEffect } from "react";
import defaultBackgroundImage from "../media/images/defaultbgimage.webp";
import Sidebar from "./Sidebar";
import Community from "./Community";
import Project from "./Project";
import Contact from "./Contact";
import "../styles/UserProfil.css";
import GalleryGrid from "./GalleryGrid";
import ProfileService from "../service/profil.service";
import profilDTO from "../data/dto/profilDTO";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import data from "../mock/mock-profils";
let profil = profilDTO;

export default function Profil2() {
  const [currentProfil, setCurrentProfil] = useState(data[0]);
  const [isLoaded, setIsLoading] = useState(false);
  const navigate = new useNavigate();
  const [tabComponent, setTabComponent] = useState(<GalleryGrid />);

  const toggleAbout = () => {
    console.log("about");
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
        <div className=" white flex justify-center ml-16 w-full mb-4 h-screen">
          <div
            className={`profile-info border border-black bg-white w-full  text-center h-[300px] `}
          >
            <div className="flex flex-wrap justify-center">
              <div className="profil-primary w-full">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {!currentProfil.firstname || currentProfil.anonymous
                    ? currentProfil.username
                    : currentProfil.firstname + " " + currentProfil.lastname}

                  <span className="italic text-gray-800 font-light">
                    {" - "} {currentProfil.category}
                  </span>
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  {currentProfil.country}
                </div>
              </div>
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  {currentProfil.description
                    ? "Bio : " + currentProfil.description
                    : "Cet utilisateur n'a pas de bio.. 😅"}
                </p>

                <Button
                  onClick={() => {
                    navigate("/profil-edit");
                  }}
                  style={{ border: "2px solid" }}
                  color="primary"
                >
                  <p className="font-bold">Modifier votre profil</p>
                </Button>
                <Button
                  onClick={toggleAbout}
                  style={{ border: "2px solid" }}
                  color="secondary"
                >
                  <p className="font-bold">A propos</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
