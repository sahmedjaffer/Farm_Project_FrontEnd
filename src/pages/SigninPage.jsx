import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInUser } from "../services/Auth";
import "../style/App.css";

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedInUser = await SignInUser(formValues);
      setUser(loggedInUser);           // update App state
      setFormValues({ username: "", password: "" });
      navigate("/");                   // redirect after login
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin">
      <form onSubmit={handleLogin}>
        <div className="input-wrapper">
          <label htmlFor="username">Email</label>
          <input
            id="username"
            type="text"
            value={formValues.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
