import Sidebar from "./Sidebar";
import data from "../mock/data";
import Panel from "./Panel";
export default function Home() {
  console.log("data :" + data);
  return (
    <div
      className="flex flex-col w-screen place-items-center"
      style={{ border: "2px solid red" }}
    >
      <Sidebar />
      {data.map((item) => {
        return <Panel key={item.id} item={item} />;
      })}
    </div>
  );
}
