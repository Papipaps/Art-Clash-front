import { useRef, useEffect } from "react";

export default function Popup({
  setPopupOpen,
  children,
  width,
  height,
  isExitable,
  onComponentExited
}) {
  const handleClickOut = () => {
    setPopupOpen(false)
    onComponentExited();
  };

  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleExit = (event) => {
      if (
        isExitable &&
        (event.keyCode === 27 || !wrapperRef.current.contains(event.target))
      ) {
        handleClickOut();
      }
    };
    document.addEventListener("mousedown", handleExit);
    window.addEventListener("keydown", handleExit);

    return () => {
      document.removeEventListener("mousedown", handleExit);
      window.removeEventListener("keydown", handleExit);
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
