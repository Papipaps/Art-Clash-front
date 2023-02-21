import { useState, useEffect, useLayoutEffect, useContext } from "react";
import defaultBackgroundImage from "../media/images/defaultbgimage.webp";
import Sidebar from "./SidebarCopy";
import "../styles/UserProfil.css";
import "../styles/Popup.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { GrContactInfo } from "react-icons/gr";
import defaultavatar from "../media/images/avatar.jpg";
import { UserContext } from "../utils/userContext";
import ClashService from "../service/clash-service";
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
      setViewedClash(response);
      if (user.id === response.ownerId) {
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
                backgroundImage: `url(${defaultBackgroundImage})`,
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
                    THEME : {viewedClash.theme}
                  </div>
                </div>
              </div>
            </div>
            {/* PROFIL CONNECT */}
            <div className="w-full relative gap-2  first-letter:text-center  justify-center   px-12 py-6">
              <p className="mb-4 w-4/5 max-h-[250px] overflow-hidden self-center text-justify  ">
                {viewedClash.description}
              </p>
              <p className="mb-4    w-[500px] max-h-[150px] overflow-hidden self-center text-justify  ">
                crée par : <strong>{viewedClash.ownerName}</strong>
              </p>
              <span className="absolute right-0 top-8 w-1/5  max-h-[150px] flex-col flex justify-evenly">
                {isOwner ? (
                  <>
                    <Button
                      className="p-4"
                      onClick={() => {
                        navigate("/clash-edit", {
                          state: { clashId: clashId },
                        });
                      }}
                      color="primary"
                    >
                      <BiEdit size={30} />
                    </Button>
                    <button
                      className=" p-2 "
                      onClick={() => ClashService.start(clashId)}
                    >
                      DEMARRAGE
                    </button>
                    <button
                      className=" p-2 "
                      onClick={() => ClashService.nextRound(clashId)}
                    >
                      SUIVANT
                    </button>
                  </>
                ) : (
                  <button
                    className=" p-2 "
                    onClick={() => ClashService.nextRound(clashId)}
                  >
                    SUIVANT
                  </button>
                )}
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
                </div>)
              }
                <strong>Participants : </strong>
              <div className="contestant-list bg-slate-200 overflow-scroll h-[50vh] w-[90vw] md:w-[800px] md:h-[400px] bg-slate-500-500 ">
                {viewedClash.contestants.map((contestant, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer h-fit bg-white hover:brightness-75 "
                    onClick={() => navigate("/profil/" + contestant)}
                  >
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src="/static/images/avatar/1.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={contestant}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                              fontWeight={700}
                            ></Typography>
                            <span>{"-"} score :</span>
                          </>
                        }
                      />
                    </ListItem>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
