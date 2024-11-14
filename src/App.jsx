import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";

export const App = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="pb-10">
        <Gallery />
        {/* 
    Main content section
    */}
      </div>
      <Footer />
    </div>
  );
};
