import { Routes, Route, useParams } from "react-router-dom";
import { Gallery } from "../components/Gallery";
import { NotFound } from "../pages/NotFound";
import { Home } from "../pages/Home";

export const CategoryRoutes = () => {
  let { category } = useParams();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:category" element={<Gallery />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
