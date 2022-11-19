import { useState, useEffect } from "react";
import { FiHome, FiArrowLeftCircle } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";
import MiniGameSelector from "./minigame-selector";
import profils from "../../mock/mock-profils";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../media/images/avatar.jpg";
import AuthService from "../../service/auth-service";
import profilDTO from "../../data/dto/profilDTO";
import playerDTO from "../../data/dto/playerDTO";

export default function MiniGame() {
  const navigate = useNavigate();

  const [loggedUser, setLoggedUser] = useState(profilDTO);
  const [player, setPlayer] = useState(playerDTO);
  const [pageIndex, setPageIndex] = useState(0);

  const page = [
    "",
    <MiniGameSelector player={player} pageIndex={setPageIndex} />,
  ];

  const next = () => {
    setPageIndex((prevPage) => (prevPage = prevPage + 1));
  };

  const before = () => {
    setPageIndex((prevPage) => (prevPage = prevPage - 1));
  };

  useEffect(() => {
    console.log(loggedUser);
    setLoggedUser(JSON.parse(AuthService.getMockUser()));
    if (loggedUser) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        username: loggedUser.username,
      }));
      setPageIndex(1);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    next();
  };
  const handleChange = (e) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      username: e.target.value,
    }));
  };
  return (
    <section className="bg-slate-400 w-screen h-screen flex justify-center items-center">
      <button
        className="absolute top-10 left-10 bg-white p-2 rounded-2xl shadow-md shadow-slate-600"
        onClick={() => {
          navigate("/login");
        }}
      >
        <FiHome size="26" />
      </button>
      {pageIndex > 0 && (
        <button
          className="absolute top-24 left-10 bg-white p-2 rounded-2xl shadow-md shadow-slate-600"
          onClick={before}
        >
          <FiArrowLeftCircle size="26" />
        </button>
      )}
      <main className="bg-white w-4/5 p-12 flex flex-col items-center rounded-lg shadow-lg shadow-slate-600">
        {pageIndex === 0 && (
          <>
            <h1 className="font-semibold">BIENVENUE DANS LES MINI JEUX !</h1>
            <form
              className="flex flex-col border w-fit p-6 justify-center gap-6 items-center"
              onSubmit={handleSubmit}
            >
              <div className="  h-[250px] w-[250px]">
                <img src={defaultAvatar} alt="" srcset="" />
              </div>
              <TextField
                required
                className="w-full"
                id="username"
                label="Pseudo"
                onChange={handleChange}
              />
              <Button
                type="submit"
                style={{ border: "2px solid" }}
                color="primary"
              >
                {<FaChevronRight size="26" />}
              </Button>
            </form>
          </>
        )}
        {page[pageIndex]}
      </main>
    </section>
  );
}
