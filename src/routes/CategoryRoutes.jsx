import { Routes, Route } from "react-router-dom";
import { Gallery } from "../components/Gallery";
import { NotFound } from "../pages/NotFound";
import { Home } from "../pages/Home";
import { Admin } from "../pages/Admin";

export const CategoryRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:category" element={<Gallery />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};
