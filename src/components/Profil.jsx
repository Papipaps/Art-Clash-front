import { useState, useEffect, useLayoutEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { HiPlus } from "react-icons/hi";
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

export default function Profil() {
  const [currentProfil, setCurrentProfil] = useState(profilDTO);
  const [viewedProfil, setViewedProfil] = useState(profilDTO);
  const [isLoaded, setIsLoading] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [tabComponent, setTabComponent] = useState(<></>);
  const [isUploadDialogOpen, setUploadDialog] = useState(false);
  const [file, setFile] = useState(null);
  const [reload, setReload] = useState(0);
  const navigate = new useNavigate();

  const { username } = useParams();

  const openUploadDialog = () => {
    setUploadDialog((prev) => !prev);
  };

  const toggleAbout = () => {
    SocialService.getFollowers(viewedProfil.id).then((response)=>{
      console.log(response.data)
      setPopupOpen((prev) => !prev);
    })
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    ProfileService.getPublicContent("").then((response) => {
      setCurrentProfil(response.data);

      if (username && username !== response.data.username) {
        setIsCurrentUser(false);
        ProfileService.getPublicContent(username).then((res) => {
          if (!res.data.error) {
            setViewedProfil(res.data);
            setTabComponent(
              <GalleryGrid reload={reload} profil={res.data.id} />
            );
          } else {
            navigate("/profil");
            window.location.reload();
          }
        });
      } else {
        console.log("it's the current profil");
        setIsCurrentUser(true);
        setViewedProfil(response.data);
        setTabComponent(
          <GalleryGrid reload={reload} profil={response.data.id} />
        );
      }
    });
    setIsLoading(true);
  }, [reload]);

  function reloadPage() {
    setReload((p) => p + 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (file) {
      const bodyFormData = new FormData();
      bodyFormData.append("file", file);
      MediaService.uploadMedia(bodyFormData).then((res) => {
        reloadPage();
        setTabComponent(<GalleryGrid profil={viewedProfil.id} />);
      });
    }
  }
  function handleFileChange(e) {
    const value = e.target.files[0];
    setFile(value);
  }
  return (
    <>
      <Sidebar />

      {isLoaded && (
        <div className="bg-slate-50 flex justify-center  w-full mb-4 h-screen">
          <></>
          {isPopupOpen && (
            <Popup setPopupOpen={setPopupOpen} isExitable={true}>
              <div className="flex justify-evenly gap-4 p-4">
                <About text={viewedProfil.about} />
              </div>
            </Popup>
          )}
          {isUploadDialogOpen && (
            <Popup setPopupOpen={setUploadDialog} isExitable={true}>
              <form onSubmit={handleSubmit}>
                <input onChange={handleFileChange} type="file" name="" id="" />
                <button type="submit">upload</button>
              </form>
            </Popup>
          )}
          {isCurrentUser && (
            <button
              onClick={openUploadDialog}
              className="fixed z-10 border bottom-0 right-0 m-16 bg-white p-6 rounded-full drop-shadow shadow-xl"
            >
              <HiPlus size={26} />
            </button>
          )}
          <div className="ml-16 flex flex-col min-w-fit break-words bg-white h-full w-full   ">
            {/* PROFIL INFO CARD */}
            <div
              style={{ backgroundSize:"cover", backgroundImage: `url(${viewedProfil.backgroundId ? `${API_CONTEXT}/media/download/${viewedProfil.backgroundId}`: defaultBackgroundImage})` }}
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
                <Button className="p-4" onClick={toggleAbout} color="primary">
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
              <div className={`profil-content-tab-items  `}>
                <button
                  onClick={() => {
                    setTabComponent(<GalleryGrid />);
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
      )}
    </>
  );
}
