import { useRef, useEffect } from "react";

export default function Popup({ setPopupOpen, children, width, height }) {
  const handleClick = () => setPopupOpen(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 || !wrapperRef.current.contains(event.target)) {
        handleClick();
      }
    };
    document.addEventListener("mousedown", handleEsc);
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleEsc);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);
  return (
    <div className="popup-background">
      <div
        ref={wrapperRef}
        className={`popup-modal flex bg-white rounded-lg`}
        style={{
          width: `${width}`,
          height: `${height || ""}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
