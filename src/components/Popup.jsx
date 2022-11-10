import { Children } from "react";

export default function Popup({ setPopupOpen, children }) {
  return (
    <div
      onClick={() => {
        setPopupOpen(false);
      }}
      className="popup-background"
    >
      <div className="popup-modal flex bg-white rounded-lg">{children}</div>
    </div>
  );
}
