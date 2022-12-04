import data from "../mock/data";
import Masonry from "@mui/lab/Masonry";
import Sidebar from "./Sidebar";

export default function Gallery() {
  return (
    <div className="gallery border border-black flex w-screen h-fit ml-16 ">
      <Sidebar />
      <Masonry columns={4} spacing={2}>
        {data.map((item, index) => (
          <img
            src={require(`../media/images/${item.imageUrl}`)}
            alt=""
            srcset=""
          />
        ))}
      </Masonry>{" "}
    </div>
  );
}
