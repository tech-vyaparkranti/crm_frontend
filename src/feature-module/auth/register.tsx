import React, { useState } from "react";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import api from "../../api/api";
import { GoogleLogin } from '@react-oauth/google';
 

 
 

 
 

type PasswordField = "password" | "confirmPassword";

const Register = () => {
  const route = all_routes;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organisation_name: "",
    employee_name: "",
    designation: "",
    role: "user",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.get("/sanctum/csrf-cookie");
      await api.post("/api/register", formData);
      alert("Registration successful!");
      navigate(route.login);
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data);
      alert("Registration failed. Please check your input or console.");
    }
  };

  return (
    <div className="account-content">
      <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden account-bg-02">
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
                <h4 className="mb-2 fs-20">Register</h4>
                <p>Create new CRMS account</p>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="col-form-label">Organisation Name</label>
                  <input
                    type="text"
                    name="organisation_name"
                    className="form-control"
                    value={formData.organisation_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="col-form-label">Employee Name</label>
                  <input
                    type="text"
                    name="employee_name"
                    className="form-control"
                    value={formData.employee_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="col-form-label">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    className="form-control"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="col-form-label">Role</label>
                  <select
                    name="role"
                    className="form-control"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="user">User</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="col-form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="col-form-label">Password</label>
                  <div className="pass-group">
                    <input
                      type={passwordVisibility.password ? "text" : "password"}
                      name="password"
                      className="pass-input form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <span
                      className={`ti toggle-passwords ${
                        passwordVisibility.password ? "ti-eye" : "ti-eye-off"
                      }`}
                      onClick={() => togglePasswordVisibility("password")}
                    ></span>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="col-form-label">Confirm Password</label>
                  <div className="pass-group">
                    <input
                      type={
                        passwordVisibility.confirmPassword
                          ? "text"
                          : "password"
                      }
                      name="password_confirmation"
                      className="pass-input form-control"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      required
                    />
                    <span
                      className={`ti toggle-passwords ${
                        passwordVisibility.confirmPassword
                          ? "ti-eye"
                          : "ti-eye-off"
                      }`}
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    ></span>
                  </div>
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
                    I agree to the{" "}
                    <Link to="#" className="text-primary link-hover">
                      Terms & Privacy
                    </Link>
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Sign Up
                </button>
              </div>

              <div className="mb-3">
                <h6>
                  Already have an account?{" "}
                  <Link to={route.login} className="text-purple link-hover">
                    Sign In Instead
                  </Link>
                </h6>
              </div>

              {/* <div className="form-set-login or-text mb-3">
                <h4>OR</h4>
              </div> */}

              <div className="d-flex align-items-center justify-content-center flex-wrap mb-3">
                {/* <div className="text-center me-2 flex-fill">
                  <Link
                    to="#"
                    className="br-10 p-2 px-4 btn bg-pending d-flex align-items-center justify-content-center"
                  >
                    <ImageWithBasePath
                      className="img-fluid m-1"
                      src="assets/img/icons/facebook-logo.svg"
                      alt="Facebook"
                    />
                  </Link>
                </div> */}
                {/* <div className="text-center me-2 flex-fill">
                  <Link
                    to="#"
                    className="br-10 p-2 px-4 btn bg-white d-flex align-items-center justify-content-center"
                  >
                    <ImageWithBasePath
                      className="img-fluid  m-1"
                      src="assets/img/icons/google-logo.svg"
                      alt="Google"
                    />
                  </Link>
                </div> */}

                 {/* google login */}

              {/* <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />; */}
                 {/* google login end  */}
                {/* <div className="text-center flex-fill">
                  <Link
                    to="#"
                    className="bg-dark br-10 p-2 px-4 btn btn-dark d-flex align-items-center justify-content-center"
                  >
                    <ImageWithBasePath
                      className="img-fluid  m-1"
                      src="assets/img/icons/apple-logo.svg"
                      alt="Apple"
                    />
                  </Link>
                </div> */}
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

export default Register;
