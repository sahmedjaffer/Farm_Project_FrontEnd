import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HotelsPage from "./pages/HotelsPage.jsx";
import AttractionsPage from "./pages/AttractionsPage.jsx";
import FlightsPage from "./pages/FlightsPage.jsx";
import Navbar from "./components/Navbar";
import "./style/App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/attractions" element={<AttractionsPage />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="*" element={<HotelsPage />} /> {/* Default page */}
      </Routes>
    </Router>
  );
};

export default App;