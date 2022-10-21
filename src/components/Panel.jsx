import { useState } from "react";
import "../styles/Panel.css";
import Popup from "./Popup";

export default function Panel({ item }) {
  console.log(item.imageUrl);
  const [isPopupOpened, setPopupOpen] = useState(false);
  const handleClick = () => {
    setPopupOpen(!isPopupOpened);
  };

  return (
    <section className="panel">
      {isPopupOpened && (
        <Popup
          imageUrl={item.imageUrl}
          setPopupOpen={setPopupOpen}
          title={item.title}
          description={item.description}
        />
      )}
      <div className="crop">
        <img onClick={handleClick} className="panel-img" src={item.imageUrl} />
      </div>
      <div className="panel-content">
        <p>
          <span>
            <img src="./media/location-icn.svg" />
            <a className="panel-link" href={item.googleMapsUrl}>
              {item.location}
            </a>
          </span>
        </p>

        <p>{item.title}</p>
        <p>
          {item.startDate}-{item.endDate ? item.endDate : "En cours"}
        </p>
        <p>{item.description}</p>
      </div>
    </section>
  );
}
