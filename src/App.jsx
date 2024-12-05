import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { CategoryRoutes } from "./routes/CategoryRoutes";

export const App = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="pb-10">
        <CategoryRoutes />
        {/* 
    Main content section
    */}
      </div>
      <Footer />
    </div>
  );
};
