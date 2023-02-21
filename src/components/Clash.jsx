import { Avatar, Divider, ListItemAvatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useContext, useEffect, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import ProfileService from "../service/profil.service";
import { UserContext } from "../utils/userContext";
import Sidebar from "./SidebarCopy";
import "../styles/Clash.css";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowToRight } from "react-icons/bi";
import ClashService from "../service/clash-service";
import Popup from "./Popup";
import { useForm } from "react-hook-form";
import {
  CustomDropdownSelector,
  CustomFormButton,
  CustomFormContainer,
  CustomInputText,
  CustomTextAreaInput,
} from "./form/form-components";

export default function Clash() {
  const [clashList, setClashList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const TOTAL_LIST_SIZE = 9;

  useEffect(() => {
    loadMore();
  }, [user, page]);

  function onSubmit(data) {
    ClashService.createClash(data).then((response) => {
      setPopupOpen(false);
      setClashList([...clashList, response.data]);
    });
  }

  function loadMore() {
    if (user) {
      ClashService.getPaginatedClashs(page, TOTAL_LIST_SIZE).then(
        (response) => {
          console.log(response);
          setClashList([...response]);
          setIsLoading(false);
        }
      );
    }
  }

  return (
    <Sidebar>
      <div className="bg-blue-600 w-full h-full">
        <section className="clash-wrapper h-full">
          {/* Hero section */}
          <div className="clash-herobanner sm:visible clash-hero h-[400px] bg-orange-500 flex items-center justify-center">
            <img className="bg-orange-400" src="" alt="" />
            <div className="text-center">
              <h1 className="text-white text-3xl font-bold">TITRE</h1>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <button
                onClick={() => navigate("/clash/special-clash")}
                className="bg-white rounded-full px-4 py-2 mt-4 text-sm font-semibold"
              >
                SPECIAL CLASH <BiArrowToRight className="inline w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Mobile Hero section */}
          <div className="clash-herobanner-mobile hidden clash-hero h-[200px] bg-red-500 justify-center items-center">
            <img className="bg-orange-400" src="" alt="" />
            <div className="text-center">
              <h1 className="text-white text-2xl font-bold">TITRE</h1>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <Link
                to="/"
                className="bg-white rounded-full  py-5 px-3 mt-4 text-sm font-semibold flex items-center"
              >
                SPECIAL CLASH <BiArrowToRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Main content */}
          <div className="clash-content flex flex-col items-center justify-center h-screen p-4 bg-green-500">
            <div className="clash-herotext w-full md:w-[800px] md:text-center my-10">
              <h1 className="text-4xl font-bold mb-4">TITLE</h1>
              <p className="md:px-32 mb-6 text-justify text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                tempus magna ac odio dignissim facilisis. Donec in sollicitudin
                velit. Integer posuere metus lectus, at bibendum metus malesuada
                id. Ut convallis libero id enim posuere mollis. Suspendisse ut
                nulla magna.
              </p>
              <div className="flex justify-center mb-8">
                <Link
                  to="/create-clash"
                  className="bg-white rounded-full py-3 px-6 text-lg font-semibold flex items-center"
                >
                  CREER CLASH <BiArrowToRight className="w-6 h-6 ml-2" />
                </Link>
              </div>
            </div>
            <div className="clash-list bg-slate-200 overflow-scroll h-[50vh] w-[90vw] md:w-[800px] bg-slate-500-500 ">
              <ul>
                {clashList.map((clash, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer  bg-white hover:brightness-75 h-full "
                    onClick={() => navigate("/clash/" + clash.id)}
                  >
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src="/static/images/avatar/1.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={clash.title}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                              fontWeight={700}
                            ></Typography>
                            <span>
                              {" "}
                              {"Theme :"} {clash.theme}{" "}
                            </span>
                          </>
                        }
                      />
                    </ListItem>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Sidebar>
  );
}
