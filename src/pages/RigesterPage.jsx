import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../services/Auth";
import "../style/App.css";

const Register = () => {
  const navigate = useNavigate();

  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialState);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await RegisterUser({
        first_name: formValues.first_name,
        last_name: formValues.last_name,
        email: formValues.email,
        password: formValues.password,
      });
      setFormValues(initialState);
      navigate("/signin");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));
    if (error) setError(""); // Clear error when user starts typing
  };

  return (
    <div className="register">
      <h1 className="registerLable">Register</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-wrapper">
          <label htmlFor="first_name" className="titleFiled">First Name</label>
          <input
            onChange={handleInputChange}
            id="first_name"
            type="text"
            placeholder="John"
            value={formValues.first_name}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="last_name" className="titleFiled">Last Name</label>
          <input
            onChange={handleInputChange}
            id="last_name"
            type="text"
            placeholder="Doe"
            value={formValues.last_name}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="email" className="titleFiled">Email</label>
          <input
            onChange={handleInputChange}
            id="email"
            type="email"
            placeholder="example@example.com"
            value={formValues.email}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password" className="titleFiled">Password</label>
          <input
            onChange={handleInputChange}
            type="password"
            id="password"
            value={formValues.password}
            required
          />
          {formValues.password && (
            <div className="password-strength">
              <div 
                className="strength-bar"
                style={{
                  width: `${Math.min(formValues.password.length * 10, 100)}%`,
                  backgroundColor: formValues.password.length > 8 ? 
                    'var(--success)' : 
                    formValues.password.length > 5 ? 
                    'var(--warning)' : 
                    'var(--danger)'
                }}
              ></div>
            </div>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="confirmPassword" className="titleFiled">Confirm Password</label>
          <input
            onChange={handleInputChange}
            type="password"
            id="confirmPassword"
            value={formValues.confirmPassword}
            required
          />
        </div>

        <div className="RegbtnC">
          <button
            className="Regbtn"
            disabled={
              !formValues.first_name ||
              !formValues.last_name ||
              !formValues.email ||
              !formValues.password ||
              formValues.password !== formValues.confirmPassword
            }
          >
            Register
          </button>
        </div>
      </form>

      <div className="linkLoginC">
        <span className="labsign">Already have an account?</span>
        <Link to="/signin" className="linkReg">Sign In</Link>
      </div>
    </div>
  );
};

export default Register;