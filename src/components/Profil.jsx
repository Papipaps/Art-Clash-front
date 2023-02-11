import { useState, useEffect, useLayoutEffect, useContext } from "react";
import defaultBackgroundImage from "../media/images/defaultbgimage.webp";
import Sidebar from "./SidebarCopy";
import Community from "./Community";
import Project from "./Project";
import Contact from "./Contact";
import "../styles/UserProfil.css";
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

export default function Profil() {
  const [viewedProfil, setViewedProfil] = useState(profilDTO);
  const [isLoading, setIsLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [tabComponent, setTabComponent] = useState(<></>);
   const navigate = new useNavigate();

  const { username } = useParams();
  const { user } = useContext(UserContext);

  // const toggleAbout = () => {
  //   SocialService.getFollowers(viewedProfil.id).then((response)=>{
  //     console.log(response.data)
  //     setPopupOpen((prev) => !prev);
  //   })
  // };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (user && (user.username == username || user.username == undefined)) {
      setIsCurrentUser(true);
      setViewedProfil(user);
      setTabComponent(
        <GalleryGrid isCurrentUser={isCurrentUser} profile={user} />
      );
      setIsLoading(false);
    } else {
      ProfileService.getPublicContent(username ? username : "").then(
        (response) => {
          setViewedProfil(response.data);
          setTabComponent(
            <GalleryGrid
              isCurrentUser={isCurrentUser}
              profile={response.data}
            />
          );
          setIsLoading(false);
        }
      );
    }
  }, []);

  return (
    <>
      <Sidebar> 
          <div className="bg-slate-50 flex justify-center  w-full mb-4 h-screen">
            <div className="flex flex-col min-w-fit break-words bg-white h-full w-full   ">
              {/* PROFIL INFO CARD */}
              <div
                style={{
                  backgroundSize: "cover",
                  backgroundImage: `url(${
                    viewedProfil.backgroundId
                      ? `${API_CONTEXT}/media/download/${viewedProfil.backgroundId}`
                      : defaultBackgroundImage
                  })`,
                }}
                className={`profile-info py-4  text-center min-h-[400px] h-[400px]`}
              >
                <div className="flex flex-wrap justify-center text-white">
                  <div className="border border-white h-[250px] w-[250px]">
                    {" "}
                    <img src={defaultavatar} alt="" srcset="" />
                  </div>
                  <div className="profil-primary w-full">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
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
                    <div className="text-sm leading-normal mt-0 mb-2  font-bold uppercase">
                      {viewedProfil.country} based {viewedProfil.category}
                    </div>
                  </div>
                </div>
              </div>
              {/* PROFIL CONNECT */}
              <div className="w-full gap-2    first-letter:text-center flex justify-center   px-12 py-6">
                <p className="mb-4    w-[500px] max-h-[150px] overflow-hidden self-center text-justify  ">
                  {viewedProfil.description
                    ? "Bio : " + viewedProfil.description
                    : "Cet utilisateur n'a pas de bio.. 😅"}
                </p>
                <span className="  max-h-[150px] flex-col flex justify-evenly">
                  <Button className="p-4" color="primary">
                    <GrContactInfo size={30} />
                  </Button>
                  {isCurrentUser && (
                    <Button
                      className="p-4"
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
              {/* PROFIL TAB CONTENT */}
              <div className="profil-content-tab  relative flex justify-around">
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
                      setTabComponent(<Community profile={viewedProfil} />);
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
