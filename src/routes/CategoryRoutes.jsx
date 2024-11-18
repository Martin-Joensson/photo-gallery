import { Routes, Route, useParams } from "react-router-dom";

import { Wildlife } from "../pages/Wildlife";
import { Landscape } from "../pages/Landscape";
import { Street } from "../pages/Street";
import { Portrait } from "../pages/Portrait";
import { Gallery } from "../components/Gallery";

export const CategoryRoutes = () => {
    let { category } = useParams();
    
  return (
    <Routes>
      <Route
        path="/category/:category"
        element={<Gallery category={category} />}
      />
      <Route path="/wildlife" element={<Wildlife />} />
      <Route path="/landscape" element={<Landscape />} />
      <Route path="/street" element={<Street />} />
      <Route path="/Portrait" element={<Portrait />} />
    </Routes>
  );
};
