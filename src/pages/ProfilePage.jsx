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
    <div className="profile-container">
      {user ? (
        profData ? (
          <>
            <div className="profile-data">
              <h1>{profData.first_name} {profData.last_name}</h1>
              <h3>{profData.email}</h3>
            </div>
            <div className="profile-actions">
              <button
                className="profile-action-btn"
                onClick={() => navigate("/profile/update-profile")}
              >
                <i className="fas fa-user-edit"></i> Update Profile
              </button>
              <button
                className="profile-action-btn"
                onClick={() => navigate("/profile/my-history")}
              >
                <i className="fas fa-history"></i> My History
              </button>
            </div>
          </>
        ) : (
          <p className="profile-loading">Loading profile...</p>
        )
      ) : (
        <div className="profile-protected">
          <h3>You must be signed in to do that!</h3>
          <button 
            className="profile-protected-btn"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;