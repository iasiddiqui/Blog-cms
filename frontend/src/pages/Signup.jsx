import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import './Signup.css'; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form); 
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500); 
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); 
  };

  return (
    <div className="signup-container">
      <h2>Admin Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email" 
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
            type={passwordVisible ? "text" : "password"} 
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



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api"; // Import API instance
// import './Signup.css';

// export default function Signup() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/auth/signup", form); // Send signup data to the backend
//       setSuccess("Account created! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 1500); // Redirect to login after success
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed.");
//     }
//   };

//   return (
//     <div className="signup-container">
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
//         <button type="submit">Sign Up</button>
//         {error && <p>{error}</p>}
//         {success && <p>{success}</p>}
//       </form>
//     </div>
//   );
// }
