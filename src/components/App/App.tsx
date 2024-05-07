import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../../layouts/MainLayout";
import { NotFound } from "../../pages";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<MainLayout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
