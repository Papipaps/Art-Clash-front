import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Panel.css";
import "../styles/Popup.css";
import Popup from "./Popup";
import CommentSection from "./CommentSection";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { BsShare } from "react-icons/bs";

export default function Panel({ item }) {
  const [isPopupOpened, setPopupOpen] = useState(false);
  const fullscreenImg = () => {
    setPopupOpen(!isPopupOpened);
  };

  return (
    <section className="panel">
      {isPopupOpened && (
        <Popup
          className="transition-all duration-300 ease-in-out"
          setPopupOpen={setPopupOpen}
          height={"95%"}
          width={"auto"}
        >
          <div className="flex items-center justify-center bg-black w-2/3 ">
            <img
              className="block w-auto max-h-full object-cover"
              src={require(`../media/images/${item.imageUrl}`)}
            />
          </div>
          <div className="popup-side bg-white w-1/3">
            <div className="h-1/6 overflow-hidden p-4">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div className="h-5/6  overflow-auto">
              <CommentSection postId={item.id}></CommentSection>
            </div>
          </div>
        </Popup>
      )}
      <div className="panel-profil-info items-center font-semibold flex gap-3 mx-5 my-2">
        <div className="profil-picture-frame">
          <img src={require("../media/images/avatar.jpg")} />
        </div>
        <p>
          {item.title}{" "}
          <span className="italic font-light text-gray-500">
            - {item.createdDate}
          </span>
        </p>
      </div>
      <div className="frame">
        <img
          onClick={fullscreenImg}
          className="panel-img"
          src={require(`../media/images/${item.imageUrl}`)}
        />
      </div>
    </section>
  );
}
