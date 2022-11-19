import { Button } from "@mui/material";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import constructionIMG from "../media/images/construction.webp";
export default function Community() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen w-screen  items-center justify-center  ">
      <h1 className="font-semibold text-5xl">
        CETTE PARTIE DU SITE EST EN CONSTRUCTION
      </h1>
      <img src={constructionIMG} alt="" srcset="" />
      <button
        onClick={() => navigate("/login")}
        className="rounded-2xl p-4"
        style={{ border: "2px solid " }}
        color="primary"
      >
        {<FaChevronLeft size="26" />}
      </button>
    </div>
  );
}
