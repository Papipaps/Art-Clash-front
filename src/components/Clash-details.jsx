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
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
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
import ClashService from "../service/clash-service";
import { CustomFormButton } from "./form/form-components";
import clashDTO from "../data/dto/clashDTO";

export default function ClashDetails() {
  const [viewedClash, setViewedClash] = useState(clashDTO);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setisOwner] = useState(false);
  const [tabComponent, setTabComponent] = useState(<></>);
  const navigate = new useNavigate();

  const { clashId } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    ClashService.getClashById(clashId).then((response) => {
      setViewedClash(response.data);
      if (user.id === response.data.ownerId) {
        setisOwner(true);
      }
      setIsLoading(false);
    });
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
                  viewedClash.backgroundId
                    ? `${API_CONTEXT}/media/download/${viewedClash.backgroundId}`
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
                    {viewedClash.title}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2  font-bold uppercase">
                    {viewedClash.theme}
                  </div>
                </div>
              </div>
            </div>
            {/* PROFIL CONNECT */}
            <div className="w-full gap-2    first-letter:text-center flex justify-center   px-12 py-6">
              <p className="mb-4    w-[500px] max-h-[150px] overflow-hidden self-center text-justify  ">
                {viewedClash.description}
              </p>
              <p className="mb-4    w-[500px] max-h-[150px] overflow-hidden self-center text-justify  ">
                crée par : {viewedClash.ownerName}
              </p>
              <span className="  max-h-[150px] flex-col flex justify-evenly">
                <Button className="p-4" color="primary">
                  <GrContactInfo size={30} />
                </Button>
                {
                  <Button
                    className="p-4"
                    onClick={() => {
                      navigate("/clash-edit", { state: { clashId: clashId } });
                    }}
                    color="primary"
                  >
                    <BiEdit size={30} />
                  </Button>
                }

                <button
                  className="border border-black p-2 "
                  onClick={() => ClashService.start(clashId)}
                >
                  DEMARRAGE
                </button>
                <button
                  className="border border-black p-2 "
                  onClick={() => ClashService.generateDummyContestants(clashId)}
                >
                  GENERATE DUMMY
                </button>
                <button
                  className="border border-black p-2 "
                  onClick={() => ClashService.nextRound(clashId)}
                >
                  SUIVANT
                </button>
              </span>
            </div>
            {/* PROFIL CONTENT */}
            <div>
              {viewedClash.status === "FINISHED" && (
                <div className="clash-podium">
                  <ListItemAvatar className="clash-winnerlist flex">
                    <div className="clash-winnerlist-item">
                      <Avatar src="/static/images/avatar/1.jpg" />
                      <span>USERNAME</span>
                    </div>
                    <div className="clash-winnerlist-item">
                      <Avatar src="/static/images/avatar/1.jpg" />
                      <span>USERNAME</span>
                    </div>
                    <div className="clash-winnerlist-item">
                      <Avatar src="/static/images/avatar/1.jpg" />
                      <span>USERNAME</span>
                    </div>
                  </ListItemAvatar>
                </div>
              )}
              {viewedClash.artists && viewedClash.artists.map((artist,index)=>(
                <div
                key={index}
                className="p-2 cursor-pointer bg-white hover:brightness-75 h-full "
                onClick={() => navigate("/profil/" + artist)}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={""}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          fontWeight={700}
                        ></Typography>
                        {" — "}
                        <span> {artist} </span>
                      </>
                    }
                  />
                </ListItem>
              </div>
              ))}
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
