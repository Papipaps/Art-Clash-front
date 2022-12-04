import { useNavigate } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";
import Canvas from "../Canvas";
export default function FreeDrawing({ player }) {
  const navigate = useNavigate();
  return (
    <section className="felx justify-center h-screen w-screen bg-slate-600">
      <button
        className="absolute top-24 left-10 bg-white p-2 rounded-2xl shadow-md shadow-slate-600"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeftCircle size="26" />
      </button>
      <h1>FreeDrawing</h1>
      <Canvas></Canvas>
    </section>
  );
}
