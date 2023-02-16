import Sidebar from "./Sidebar";
import { Navigate, useNavigate } from "react-router-dom";
import CanvasDraw from "react-canvas-draw";
import { useState } from "react";
import "../styles/Main.css";
import { Tooltip } from "@mui/material";

export default function Canvas() {
  const colorPalette = [
    {
      color: "red",
      code: "#FF3500",
    },
    {
      color: "orange",
      code: "#FFB231",
    },
    {
      color: "yellow",
      code: "#FFF400",
    },
    {
      color: "green",
      code: "#6FFF00",
    },
    {
      color: "cyan",
      code: "#00FFF1",
    },
    {
      color: "blue",
      code: "#317DFF",
    },
    {
      color: "purple",
      code: "#AE34FF",
    },
    {
      color: "pink",
      code: "#FE6CEB",
    },
    {
      color: "white",
      code: "#FFFFFF",
    },
    {
      color: "black",
      code: "#000000",
    },
  ];
  const [state, setState] = useState({
    brush: {
      size: 10,
      color: {},
    },
  });
  const navigate = useNavigate();
  const handleColorChange = (e) => {
    const color = e.target.style.backgroundColor || e.target.value;
    setState({
      brush: {
        ...state.brush,
        color,
      },
    });
  };

  return (
    <div className="flex justify-around  items-center w-full h-full place-self-center">
      <div className="canvas-left drop-shadow-lg shadow-gray-500 shadow-md">
        <input
          className="w-4/5 m-2 shadow-gray-500 shadow-sm"
          type="color"
          onChange={handleColorChange}
        />
        <div className="canvas-palette gap-2 w-fit h-fit grid grid-cols-2 ">
          {colorPalette.map((palette) => {
            return (
              <Tooltip
                enterDelay={500}
                placement="left"
                title={palette.color}
                disableInteractive
                arrow
              >
                <div
                  className="canvas-palette-color shadow-gray-500 shadow-md  "
                  onClick={handleColorChange}
                  style={{ backgroundColor: `${palette.code}` }}
                ></div>
              </Tooltip>
            );
          })}
        </div>
      </div>
      <div className="canvas-main">
        <CanvasDraw
          className="drop-shadow-lg shadow-gray-500 shadow-md "
          brushColor={state.brush.color}
          canvasWidth={800}
          canvasHeight={600}
        ></CanvasDraw>
      </div>
      <div className="canvas-right drop-shadow-lg shadow-gray-500 shadow-md"></div>
    </div>
  );
}
