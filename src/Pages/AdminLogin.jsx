import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../css/Admin.css";


const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [logging, setLogging] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogging(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour
        localStorage.setItem("expiration", expirationTime);

        setIsAuthenticated(true);
        navigate("/dashboard"); // Redirect to dashboard or any page
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Error logging in. Please try again.");
    } finally {
      setLogging(false);
    }
  };

  return (
    <div className="box">
      <div className="container">
        <section className="min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8 col-sm-10 d-flex flex-column align-items-center justify-content-center">
              <div className="card shadow-lg w-100 mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-3 text-primary">
                      Admin Login
                    </h5>
                  </div>
                  <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-12">
                      <label htmlFor="yourEmail" className="form-label fw-bold">
                        Your Email:
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="yourEmail"
                        onChange={handleChange}
                        required
                        value={formData.email}
                      />
                    </div>

                    <div className="col-12">
                      <label
                        htmlFor="yourPassword"
                        className="form-label fw-bold"
                      >
                        Password:
                      </label>
                      <div className="password-container">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="form-control"
                          id="yourPassword"
                          onChange={handleChange}
                          required
                          value={formData.password}
                        />
                        <span
                          onClick={togglePasswordVisibility}
                          className="password-icon"
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </span>
                      </div>
                    </div>

                    {error && <p className="text-danger">{error}</p>}

                    <div className="col-12">
                      <button
                        className={`btn btn-primary w-100 fs-5 ${
                          logging ? "loading" : ""
                        }`}
                        type="submit"
                        disabled={logging}
                      >
                        {logging ? "Logging in..." : "Log In"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
