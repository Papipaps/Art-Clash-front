const tab = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
export default function GalleryGrid({ width, height, images }) {
  return (
    // <div className={`border border-red-700 h-[${height}px] px-4 my-4`}>
    <section className="grid grid-cols-4 p-4">
      {tab.map((item, index) => {
        return (
          <p className="border border-black h-[400px] w-auto" key={index}></p>
        );
      })}
    </section>
    // </div>
  );
}
