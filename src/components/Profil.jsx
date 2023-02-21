import { useState, useEffect, useLayoutEffect, useContext } from "react";
import defaultBackgroundImage from "../media/images/defaultbgimage.webp";
import Sidebar from "./SidebarCopy";
import Community from "./Community";
import Project from "./Project";
import Contact from "./Contact";
 import "../styles/Popup.css";
import GalleryGrid from "./GalleryGrid";
import ProfileService from "../service/profil.service";
import profilDTO from "../data/dto/profilDTO";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { GrContactInfo } from "react-icons/gr";
import data from "../mock/mock-profils";
import defaultavatar from "../media/images/avatar.jpg";
import Popup from "./Popup";
import axios from "axios";
import authHeader from "../service/auth-header";
import MediaService from "../service/media-service";
import { isFocusable } from "@testing-library/user-event/dist/utils";
import About from "./About";
import SocialService from "../service/social-service";
import { API_CONTEXT } from "../utils/Paths";
import { UserContext } from "../utils/userContext";
import mockProfils from "../mock/mock-profils";

export default function Profil() {
  const [viewedProfil, setViewedProfil] = useState(profilDTO);
  const [isLoading, setIsLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [tabComponent, setTabComponent] = useState(<></>);
  const navigate = new useNavigate();

  const { username } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user && (user.username == username || username == undefined)) {
      setIsCurrentUser(true);
      setViewedProfil(user);
      setTabComponent(
        <GalleryGrid isCurrentUser={isCurrentUser} profile={user} />
      );
      setIsLoading(false);
    } else if (username === "Papipaps") {
      setIsCurrentUser(false);
      setViewedProfil(mockProfils[0]);
      setTabComponent(
        <GalleryGrid isCurrentUser={false} profile={mockProfils[0]} />
      );
      setIsLoading(false);
    } else {
      setIsCurrentUser(false);
      setViewedProfil(
        mockProfils.filter((p) => p.id !== "uuid-admin")[
          Math.floor(Math.random() * 49)
        ]
      );
      setTabComponent(
        <GalleryGrid isCurrentUser={false} profile={viewedProfil} />
      );
      setIsLoading(false);
    }
  }, [username, user]);

  return (
    <>
      <Sidebar>
        <div className="bg-slate-50 flex justify-center  w-full mb-4 h-screen">
          <div className="flex flex-col min-w-fit break-words bg-white h-full w-full   ">
            {/* PROFIL INFO CARD */}
            <div
              className="profile-info py-4 text-center min-h-[400px]"
              style={{ backgroundImage: `url(${defaultBackgroundImage})` }}
            >
              <div className="text-white flex flex-col items-center">
                <img
                  className="border border-white aspect-square max-w-[250px]"
                  src={defaultavatar}
                  alt="Profile Avatar"
                />
                <div className="profile-primary w-full">
                  <h3 className="text-blueGray-700">
                    {viewedProfil.anonymous ? (
                      viewedProfil.username
                    ) : (
                      <div>
                        <span>{viewedProfil.username} </span>
                        {viewedProfil.firstname && (
                          <span className="italic">
                            {" - "}
                            {viewedProfil.firstname} {viewedProfil.lastname}
                          </span>
                        )}
                      </div>
                    )}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 font-bold uppercase">
                    {viewedProfil.country} based {viewedProfil.category}
                  </div>
                </div>
              </div>
            </div>
            {/* PROFIL CONNECT */}
            <div className="w-full  flex sm:flex-row flex-col items-center ">
              <div className="max-h-[150px] w-full flex justify-center p-4 text-justify ">
                <p className="text-center sm:w-[500px]">

                {viewedProfil.description
                  ? "Bio : " + viewedProfil.description
                  : "Cet utilisateur n'a pas de bio.. 😅"}
                  </p>
              </div>
              <span className="max-h-[150px] py-2">
                <Button color="primary">
                  <GrContactInfo size={30} />
                </Button>
                {isCurrentUser && (
                  <Button 
                    onClick={() => {
                      navigate("/profil-edit");
                    }}
                    color="primary"
                  >
                    <BiEdit size={30} />
                  </Button>
                )}
              </span>
            </div>
            {/* PROFIL TABS */}
            <div className=" flex justify-around">
              <div className={`profil-content-tab-items`}>
                <button
                  onClick={() => {
                    setTabComponent(
                      <GalleryGrid
                        isCurrentUser={isCurrentUser}
                        profile={viewedProfil}
                      />
                    );
                  }}
                >
                  {" "}
                  Gallerie
                </button>
              </div>
              <div className={`profil-content-tab-items`}>
                <button
                  onClick={() => {
                    setTabComponent(<Project />);
                  }}
                >
                  {" "}
                  Projets
                </button>
              </div>
              <div className={`profil-content-tab-items `}>
                <button
                  onClick={() => {
                    setTabComponent(<h1>Communauté</h1>);
                  }}
                >
                  {" "}
                  Communauté
                </button>
              </div>
              <div className={`profil-content-tab-items `}>
                <button
                  onClick={() => {
                    setTabComponent(<Contact />);
                  }}
                >
                  {" "}
                  Contact
                </button>
              </div>
            </div>
            {/* PROFIL CONTENT */}
            <div>{tabComponent}</div>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
