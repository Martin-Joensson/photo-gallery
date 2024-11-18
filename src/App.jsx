import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { CategoryRoutes } from "./routes/CategoryRoutes";

export const App = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="pb-10">
        <CategoryRoutes />
        <Gallery />
        {/* 
    Main content section
    */}
      </div>
      <Footer />
    </div>
  );
};
