import { Routes, Route, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ loggedIn, path, element }) {
  console.log(loggedIn);
  const navigate = useNavigate();
  if (loggedIn) {
    return <Route path={path} element={element} />;
  }
  return navigate("/login");
}
