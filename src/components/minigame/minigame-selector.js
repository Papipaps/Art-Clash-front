import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MiniGameSelector({ player, pageIndex }) {
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
        <li className="border border-black p-2 my-2">
          <Link to={`/minigame/FreeDrawing`}>Dessin libre !</Link>
        </li>
        <li className="border border-black p-2 my-2">
          <Link to={`/minigame/GuessGame`}>Art-ffrontement !</Link>
        </li>
      </ul>
    </section>
  );
}
