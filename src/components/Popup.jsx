export default function Popup({ imageUrl, setPopupOpen, title, description }) {
  return (
    <div
      onClick={() => {
        setPopupOpen(false);
      }}
      className="popup-background"
    >
      <div className="popup-modal flex">
        <div className="flex items-center bg-red-700 w-[900px]">
          <img src={require(`../media/images/${imageUrl}`)} />
        </div>
        <div className="popup-side bg-blue-700 w-full">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
