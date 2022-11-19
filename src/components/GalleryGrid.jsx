import data from "../mock/data";
// const tab = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
export default function GalleryGrid({ width, height, images }) {
  return (
    <section
      style={{ gridTemplateColumns: "repeat(auto-fill,350px)" }}
      className="grid w-full my-4 gap-1   justify-center   "
    >
      {data.map((item) => {
        return (
          <div className=" border w-[350px] h-[400px] ">
            <img
              className="object-cover overflow-hidden h-full"
              src={require(`../media/images/${item.imageUrl}`)}
              alt=""
              srcset=""
            />
          </div>
        );
      })}
    </section>
    // </div>
  );
}
