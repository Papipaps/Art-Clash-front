import { useState } from "react";
import "../styles/Panel.css";
import "../styles/Popup.css";
import Popup from "./Popup";
import CommentSection from "./CommentSection";
import { API_CONTEXT } from "../utils/Paths";

export default function Panel({ item }, height="100%", width="100%") {
  const [isPopupOpen, setPopupOpen] = useState(false);
  return (
    <section 
    style={{
      width:width,
      height:height
    }}
    className="panel">
      {isPopupOpen && (
        <Popup
          className="panel-popup "
          setPopupOpen={setPopupOpen}
          width={"900px"}
          isExitable={true}
        >
          <div className="w-full min-w-fit h-full"> 
            <div
              onMouseEnter={(e)=>{
                const element = document.getElementById("description");
                element.className="absolute bottom-0 left-0 w-full h-[150px] bg-black bg-opacity-75 text-white"
              }}
              onMouseLeave={(e)=>{
                const element = document.getElementById("description");
                element.className="hidden"
            
              }}
              className=" relative flex items-center justify-center">
               
                <div>
                  <div className="hidden" name="description" id="description">
                    {item.description}
                  </div>
                  <img
                    className="block w-auto max-h-full object-cover"
                    src={require(`../media/dessin/${item.imageUrl}`)}
                    />
                </div> 
            </div>

            <div className="popup-bottom h-full">
              <div className="">
                <CommentSection postId={item.id}></CommentSection>
              </div>
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
          onClick={() => setPopupOpen(true)}
          className="h-full"
          src={require(`../media/dessin/${item.imageUrl}`)}
          />
      </div>
    </section>
  );
}
