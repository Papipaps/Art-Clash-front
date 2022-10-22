export default function Popup({ imageUrl, setPopupOpen, title, description }) {
  return (
    <div
      onClick={() => {
        setPopupOpen(false);
      }}
      className="popup-background"
    >
      <div className="popup-modal">
        <img src={require(`../media/images/${imageUrl}`)} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
