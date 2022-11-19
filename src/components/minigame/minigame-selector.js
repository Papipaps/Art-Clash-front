import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GuessGame from "./guessgame.component";
import FreeDrawing from "./freedrawing.component";

export default function MiniGameSelector({ player, pageIndex }) {
  const selector = [<GuessGame />, <FreeDrawing />];
  useEffect(() => {
    if (!player.username) {
      pageIndex(0);
    }
  }, []);
  return (
    <section>
      <h1 className="font-semibold">
        PSEUDO : {player.username || "non_defini"}
      </h1>
      <ul>
        {selector.map((mode) => {
          const gamemode = mode.type.name;
          return (
            <li className="border border-black p-2 my-2">
              <Link to={`/minigame/${gamemode}`}>{gamemode}</Link>;
            </li>
          );
        })}
      </ul>
    </section>
  );
}
