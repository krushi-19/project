import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { url } from "../../../Commons/constants";
import { Header } from "../../Components/Header";
import Footer from "../../Components/Footer";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const CheckRole = (role) => {
    if (role === "user") {
      history.push("/car_list");
    } else if (role === "admin") {
      history.push("/admin_dashboard");
    } else {
      history.push("/employee_dashboard");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (email.length === 0) {
      newErrors.email = "Enter your email";
    }
    if (password.length === 0) {
      newErrors.password = "Enter your password";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validUser = () => {
    if (validate()) {
      const data = {
        email: email,
        password: password,
      };

      axios.post(url + "/user/authenticate", data).then((response) => {
        const result = response.data;
        if (result.status === "success") {
          alert("Login Successfully");
          sessionStorage.setItem("isActive", "true");
          sessionStorage.setItem("user", JSON.stringify(result));
          CheckRole(result.data.role);
        } else {
          setErrors({ api: "Invalid username or password" });
        }
      });
    }
  };

  return (
    <div id="root">
      <Header /> {/* Always show Header */}
      <div className="main-content">
        <div className="text-center">
          <main className="form-signin" style={{ marginTop: "150px" }}>
            <i className="fas fa-user"></i>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
              <input
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                autoComplete="off"
              />
              <label htmlFor="floatingInput">Email address</label>
              {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
            </div>
            <div className="form-floating">
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                autoComplete="off"
              />
              <label htmlFor="floatingPassword">Password</label>
              {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
            </div>
            <div className="form-floating">
              {errors.api && <div style={{ color: "red" }}>{errors.api}</div>}
            </div>
            <div className="form-floating">
              Can't remember your password? Click <Link to="/reset_password">here</Link> to reset your password.
            </div>
            <button className="w-100 btn btn-primary" onClick={validUser}>
              Log In
            </button>
            <div className="form-floating">
              Not a user? <Link to="/register">Register</Link> here.
            </div>
            <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
          </main>
        </div>
      </div>
      <Footer /> {/* Always show Footer */}
    </div>
  );
};

export default Login;
