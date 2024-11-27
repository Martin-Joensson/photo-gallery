import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div className="aboslute top-0 w-full border-red-500">
      <h1 className="font-headerFont text-2xl">Martin Jönsson Photography</h1>
      <div className="flex flex-col justify-evenly font-headerFont tablet:flex-row">
        <NavLink to="/category/wildlife">
          <h2>WildLife</h2>
        </NavLink>
        <NavLink to="/category/landscape">
          <h2>Landscape</h2>
        </NavLink>
        <NavLink to="/category/street">
          <h2>Street</h2>
        </NavLink>
        <NavLink to="/category/portrait">
          <h2>Portrait</h2>
        </NavLink>
      </div>
      {/* 
    
    Logo, categories, links sleek and stylish.

    */}
    </div>
  );
};
