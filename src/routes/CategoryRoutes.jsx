import { Routes, Route, useParams } from "react-router-dom";

import { Wildlife } from "../pages/Wildlife";
import { Landscape } from "../pages/Landscape";
import { Street } from "../pages/Street";
import { Portrait } from "../pages/Portrait";
import { Gallery } from "../components/Gallery";
import { NotFound } from "../pages/NotFound";

export const CategoryRoutes = () => {
  let { category } = useParams();
  console.log(category);

  return (
    <Routes>
      <Route path="/category/:category" element={<Gallery />} />
      <Route path="/wildlife" element={<Wildlife />} />
      <Route path="/landscape" element={<Landscape />} />
      <Route path="/street" element={<Street />} />
      <Route path="/Portrait" element={<Portrait />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
