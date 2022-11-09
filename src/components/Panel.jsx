import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Panel.css";
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
  const [isCommentOpend, setCommentOpen] = useState(false);
  const openComment = () => {
    setCommentOpen(!isCommentOpend);
  };
  const [isToolboxOpen, setToolboxOpen] = useState(false);
  const openToolbox = () => {
    setToolboxOpen(true);
  };
  const closeToolbox = () => {
    setToolboxOpen(false);
  };

  return (
    <section
      onMouseEnter={openToolbox}
      onMouseLeave={closeToolbox}
      className="panel"
    >
      {isPopupOpened && (
        <Popup
          imageUrl={item.imageUrl}
          setPopupOpen={setPopupOpen}
          title={item.title}
          description={item.description}
        />
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
      {isToolboxOpen && (
        <ul className="panel-toolbox">
          <li>
            <AiOutlineHeart size="25" />
            <span>0</span>
          </li>
          <li>
            <i>
              <HiOutlineChatBubbleOvalLeft size="25" onClick={openComment} />
            </i>
            <span>0</span>
          </li>
          <li>
            <i>
              <BsShare size="25" />
            </i>
            <span>0</span>
          </li>
        </ul>
      )}
      {isCommentOpend && <CommentSection setCommentOpen={setCommentOpen} />}
    </section>
  );
}
