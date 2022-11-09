import Sidebar from "./Sidebar";
import data from "../mock/data";
import Panel from "./Panel";
export default function Home() {
  const images = data.map((item) => {
    return <Panel key={item.id} item={item} />;
  });
  return (
    <div className="flex flex-col w-screen place-items-center">
      <Sidebar />
      {images}
    </div>
  );
}
