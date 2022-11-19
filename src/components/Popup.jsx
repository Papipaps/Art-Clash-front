export default function Popup({ setPopupOpen, children, width, height }) {
  return (
    <div
      onClick={() => {
        setPopupOpen(false);
      }}
      className="popup-background"
    >
      <div
        className={`popup-modal flex bg-white rounded-lg w-[${width}px] h-[${height}px]`}
      >
        {children}
      </div>
    </div>
  );
}
