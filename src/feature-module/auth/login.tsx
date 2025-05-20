import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import api from "../../api/api";

const Login = () => {
  const route = all_routes;
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  type FormData = {
    password: string;
    email: string;
    [key: string]: string;
  };

  const [form, setForm] = useState<FormData>({
    password: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/login", form);
      const { token, user } = response.data;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.role); // ✅ Save user role
      localStorage.setItem("userDesignation", user.designation); 
      localStorage.setItem("userData", JSON.stringify(user));

      navigate(route.dealsDashboard);
    } catch (error: any) {
      console.error("Login failed:", error.response?.data);
      alert("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    localStorage.setItem("menuOpened", "Dashboard");
  }, []);

  return (
    <div className="account-content">
      <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden account-bg-01">
        <div className="d-flex align-items-center justify-content-center flex-wrap vh-100 overflow-auto p-4 w-50 bg-backdrop">
          <form className="flex-fill" onSubmit={handleSubmit}>
            <div className="mx-auto mw-450">
              <div className="text-center mb-4">
                <ImageWithBasePath
                  src="assets/img/logocorrectwhite.jpg"
                  className="img-fluid"
                  alt="Logo"
                />
              </div>
              <div className="mb-4">
                <h4>Sign In</h4>
                <p>Access the CRMS panel using your email and passcode.</p>
              </div>
              <div className="mb-3">
                <label className="col-form-label">Email Address</label>
                <div className="position-relative">
                  <span className="input-icon-addon">
                    <i className="ti ti-mail"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="col-form-label">Password</label>
                <div className="pass-group">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className="pass-input form-control"
                    name="password"
                    onChange={handleChange}
                  />
                  <span
                    className={`ti toggle-password ${isPasswordVisible ? "ti-eye" : "ti-eye-off"}`}
                    onClick={togglePasswordVisibility}
                  ></span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="form-check form-check-md d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkebox-md"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="checkebox-md">
                    Remember Me
                  </label>
                </div>
                <div className="text-end">
                  <Link to={route.forgotPassword} className="text-primary fw-medium link-hover">
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Sign In
                </button>
              </div>
              <div className="mb-3">
                <h6>
                  New on our platform?
                  <Link to={route.register} className="text-purple link-hover">
                    {" "}Create an account
                  </Link>
                </h6>
              </div>
              <div className="text-center">
                <p className="fw-medium text-gray">Copyright © 2024 - CRMS</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
