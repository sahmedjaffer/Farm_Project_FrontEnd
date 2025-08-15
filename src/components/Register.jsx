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
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value ?? "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage("Passwords do not match.");
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
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed.");
      console.error(error);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-wrapper">
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            type="text"
            placeholder="John"
            value={formValues.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            type="text"
            placeholder="Doe"
            value={formValues.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@example.com"
            value={formValues.email}
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

        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

<div className="RegbtnC">
  <button
    className="Regbtn"
    disabled={
      !formValues.name ||
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
        <p>
          Already have an account?{" "}
          <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
