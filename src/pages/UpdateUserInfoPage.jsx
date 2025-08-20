import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateUserAuth } from "../services/Auth";
import { ProfileData } from "../services/Profile";
import CustPop from "../components/CustPop";
import "../style/App.css";

const UserUpdate = ({ user }) => {
  const [popup, setPopup] = useState(null);
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Prefill form with existing user info
  useEffect(() => {
    const fetchProfile = async () => {
      const data = await ProfileData();
      setFormValues({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        password: "",
      });
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // فقط الحقول التي تغيرت
  const updateData = Object.fromEntries(
    Object.entries(formValues).filter(([, value]) => value.trim() !== "")
  );

  if (Object.keys(updateData).length === 0) {
    setPopup({
      text: "Please change at least one field to update.",
      status: "fail",
      route: "/profile",
    });
    return;
  }

  try {
    const res = await UpdateUserAuth(updateData);

    if (res?.status === "Ok") {
      // تحديث بيانات الفورم من الرد
      setFormValues({
        first_name: res.data.first_name || "",
        last_name: res.data.last_name || "",
        email: res.data.email || "",
        password: "",
      });

      // تحديث بيانات المستخدم في الواجهة إذا كان عندك setUser
      if (typeof user?.setUser === "function") {
        user.setUser(res.data);
      }

      setPopup({
        text: "User info updated successfully!",
        status: "ok",
        route: "/profile",
      });
    } else {
      setPopup({
        text: "Something went wrong while updating user info.",
        status: "fail",
        route: "/profile",
      });
    }
  } catch (err) {
    console.error(err);
    setPopup({
      text: "An error occurred.",
      status: "fail",
      route: "/profile",
    });
  }
};



  const handleClosePopup = () => setPopup(null);

  return (
    <div className="user-update">
      {user ? (
        <>
          <label className="signInLable">Update User Info</label>

          <form className="col" onSubmit={handleSubmit}>
            {["first_name", "last_name", "email", "password"].map((field) => (
              <div key={field} className="input-wrapper">
                <label htmlFor={field} className="titleFiled">
                  {field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </label>
                <input
                  onChange={handleChange}
                  type={field === "password" ? "password" : "text"}
                  id={field}
                  value={formValues[field]}
                  placeholder={field === "password" ? "Leave empty if no change" : ""}
                  className="passLogin"
                />
              </div>
            ))}

            <div className="btnLoginC">
              <button
                className="btnlogin"
                disabled={
                  !formValues.first_name &&
                  !formValues.last_name &&
                  !formValues.email &&
                  !formValues.password
                }
              >
                Update Info
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="protected">
          <h3>You must be signed in to do that!</h3>
          <button onClick={() => navigate("/signin")}>Sign In</button>
        </div>
      )}

      {popup && (
        <CustPop
          text={popup.text}
          route={popup.route}
          onClose={handleClosePopup}
          status={popup.status}
        />
      )}
    </div>
  );
};

export default UserUpdate;
