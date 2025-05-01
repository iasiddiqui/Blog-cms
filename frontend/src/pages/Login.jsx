import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import './Login.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending login request with:", form); // Debug log
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          className="login-input"
          required
        />
        <div className="login-password-container">
          <input
            name="password"
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            className="login-input"
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
        <button type="submit" className="login-button">Login</button>
        {error && <p className="login-error">{error}</p>}
      </form>
      <p className="login-signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}


// /
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api"; // Import the API instance
// import './Login.css';

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", form); // Send login request
//       localStorage.setItem("token", res.data.token); // Save token to localStorage
//       navigate("/admin"); // Redirect to dashboard after successful login
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit}>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           onChange={handleChange}
//           value={form.email}
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//           value={form.password}
//         />
//         <button type="submit">Login</button>
//         {error && <p>{error}</p>}
//       </form>
//     </div>
//   );
// }
