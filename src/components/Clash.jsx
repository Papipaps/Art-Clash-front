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
          console.log(response)
          setClashList([...response]);
          setIsLoading(false);
        }
      );
    }
  } 

  return (
    <Sidebar>
      {isPopupOpen && (
        <Popup isExitable={true} setPopupOpen={setPopupOpen}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomFormContainer width={"550px"}>
              <CustomInputText
                register={register}
                label={"Nommez le clash ! "}
                labelKey={"title"}
              />
              <CustomTextAreaInput
                register={register}
                label={"Description"}
                labelKey={"description"}
              />
              <CustomInputText
                label={"Theme ?"}
                register={register}
                labelKey={"theme"}
              />
              <CustomDropdownSelector
              register={register}
                label={"Nombre de participant"}
                labelKey={"slot"}
                numbers={[6,8,10]}
              />
              <CustomDropdownSelector
                register={register}
                label={"Manche"}
                labelKey={"round"}
                numbers={[3,4,5]}
              />
              <CustomFormButton
                register={register}
                label={"Envoyer"}
                buttonType="submit"
              />
            </CustomFormContainer>
          </form>
        </Popup>
      )}
      <div className="w-full h-full bg-blue-600">
        <section className="clash-wrapper h-full">
          <div className="clash-herobanner md:visible clash-hero  h-[400px] bg-orange-500">
            <img className="bg-orange-400" src="" />
            <h1>TITRE</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur.<span></span>
            </p>
            <button className="bg-white">SPECIAL CLASH</button>
          </div>
          <div className="clash-herobanner-mobile hidden clash-hero  h-[200px] bg-red-500">
            <img className="bg-orange-400" src="" />
            <h1>TITRE</h1>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <button className="bg-white">SPECIAL CLASH</button>
          </div>
          <div className="clash-content h-fit p-4 bg-green-500 justify-center">
            <p>dummy text</p>
            
            <div className="clash-herotext w-full md:w-[800px] md:text-center my-10">
              <h1>TITLE</h1>
              <p className="md:px-32 mb-6 text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea,
                officiis earum quae nesciunt fugiat, molestiae voluptatibus sed
                recusandae labore laborum veniam perferendis unde voluptatem
                obcaecati exercitationem nobis? Praesentium, aspernatur soluta?
              </p>
              <h2>
                PARTICIPEZ OU CREER :
                <button onClick={() => setPopupOpen(true)} className="bg-white">
                  {" "}
                  CREER CLASH{" "}
                </button>
              </h2>
            </div>
            <div className="clash-list overflow-scroll h-[650px] w-[350px] md:w-[450px] bg-slate-500-500 border border-black">
              <ul>
                {clashList.map((clash, index) => (
                  <>
                    <div
                      key={index}
                      className="p-2 cursor-pointer bg-white hover:brightness-75 h-full "
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
                              <span> {"Theme :"} {clash.theme} </span>
                            </>
                          }
                        />
                      </ListItem>
                    </div>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Sidebar>
  );
}
