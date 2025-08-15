import { Routes, Route } from "react-router-dom"; // just Routes and Route
import { useState,  } from "react";
import HotelsPage from "./pages/HotelsPage.jsx";
import AttractionsPage from "./pages/AttractionsPage.jsx";
import FlightsPage from "./pages/FlightsPage.jsx";
import Navbar from "./components/Navbar";
import "./style/App.css";
import RegisterPage from "./pages/RigesterPage.jsx";
import SignInPage from "./pages/SigninPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import UserUpdate from "./pages/UpdateUserInfoPage.jsx";
import MyHistoryPage from "./pages/MyHistory";
"src/pages/RigesterPage.jsx.jsx"
const App = () => {
  const [user, setUser] = useState(null);

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <>
      <Navbar user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile/*" element={<ProfilePage user={user} />} />
          <Route path="/profile/update-profile" element={<UserUpdate user={user} />} />
          <Route path="/profile/my-history" element={<MyHistoryPage user={user} />} />
          <Route path="/hotels" element={<HotelsPage user={user}/>} />
          <Route path="/attractions" element={<AttractionsPage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App