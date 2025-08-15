import { useState, useEffect } from "react";
import "../style/App.css";
import { ProfileData } from "../services/Profile";
import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  let navigate = useNavigate();
  const [profData, setProfData] = useState(null);

  useEffect(() => {
    const handleProfileData = async () => {
      const data = await ProfileData();
      setProfData(data);
    };
    handleProfileData();
  }, []);

  return (
    <div className="profileContainer">
      {user ? (
        profData ? (
          <>
            <div className="profileData">
              <h1>{profData.first_name} {profData.last_name}</h1>
              <h3>{profData.email}</h3>
            </div>
            <div className="profileAction">
              <button
                onClick={() => {
                  navigate("/profile/update-profile");
                }}
              >
                Update Profile
              </button>
              <button
                onClick={() => {
                  navigate("/profile/my-history");
                }}
              >
                My History
              </button>
            </div>
          </>
        ) : (
          <p className="loading">Loading profile...</p>
        )
      ) : (
        <div className="protected">
          <h3>You must be signed in to do that!</h3>
          <button onClick={() => navigate("/signin")}>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default Profile;