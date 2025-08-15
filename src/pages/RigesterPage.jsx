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

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: check if password matches confirmPassword
    if (formValues.password !== formValues.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    await RegisterUser({
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      email: formValues.email,
      password: formValues.password,
    });

    setFormValues(initialState);
    navigate("/signin");
  };

  return (
    <div className="register">
      <label htmlFor="col" className="registerLable">Register</label>
      <form onSubmit={handleSubmit} className="col" id="col">
        <div className="input-wrapper">
          <label htmlFor="first_name" className="titleFiled">First Name</label>
          <input
            onChange={handleChange}
            id="first_name"
            type="text"
            placeholder="John"
            value={formValues.first_name}
            required
            className="nameReg"
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="last_name" className="titleFiled">Last Name</label>
          <input
            onChange={handleChange}
            id="last_name"
            type="text"
            placeholder="Doe"
            value={formValues.last_name}
            required
            className="nameReg"
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="email" className="titleFiled">Email</label>
          <input
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="example@example.com"
            value={formValues.email}
            required
            className="emailReg"
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password" className="titleFiled">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            value={formValues.password}
            required
            className="passReg"
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="confirmPassword" className="titleFiled">Confirm Password</label>
          <input
            onChange={handleChange}
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
        <label htmlFor="linkReg" className="labsign">Already have an Account?</label>
        <Link to="/signin" id="linkReg" className="linkReg">Sign In</Link>
      </div>
    </div>
  );
};

export default Register;
