import Sidebar from "./Sidebar";
import data from "../mock/data";
import Panel from "./Panel";
import TrendingNav from "./TrendingNav";

export default function Home() {
  const images = data.map((item) => {
    return <Panel key={item.id} item={item} />;
  });
  return (
    <>
      <Sidebar />
      {/* <TrendingNav /> */}
      <div className="flex flex-col w-screen place-items-center">{images}</div>
    </>
  );
}
