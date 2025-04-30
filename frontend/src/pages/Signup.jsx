import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import './Signup.css'; // Import CSS
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons for password visibility toggle

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility toggle
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form); // Send the email and password to the backend
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle password visibility
  };

  return (
    <div className="signup-container">
      <h2>Admin Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email" // Email field for signup
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          className="signup-input"
          required
        />
        <div className="signup-password-container">
          <input
            name="password"
            type={passwordVisible ? "text" : "password"} // Toggle password visibility
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            className="signup-input"
            required
          />
          <button
            type="button"
            className="password-eye-icon"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
        {error && <p className="signup-error">{error}</p>}
        {success && <p className="signup-success">{success}</p>}
      </form>
      <p className="signup-login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
