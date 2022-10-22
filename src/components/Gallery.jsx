import data from "../mock/data";
import Masonry from "@mui/lab/Masonry";
import Sidebar from "./Sidebar";

export default function Gallery() {
  return (
    <>
      <Sidebar />
      <div className="gallery flex w-screen px-56">
        <Masonry columns={3} spacing={2}>
          {data.map((item, index) => (
            <div key={index}>
              <img
                src={require(`../media/images/${item.imageUrl}`)}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: "block",
                  width: "100%",
                }}
              />
            </div>
          ))}
        </Masonry>
      </div>
    </>
  );
}
