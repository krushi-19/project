import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { url } from "../../../Commons/constants";
import { Header } from "../../Components/Header";
import Footer from "../../Components/Footer";


const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setdob] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("user");
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const validate = () => {
    const newErrors = {};
    if (username.trim().length === 0 || username.trim().length < 3) {
      newErrors.username = "Please enter a correct name.";
    }
    if (email.trim().length === 0) {
      newErrors.email = "Please enter an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase())) {
      newErrors.email = "Invalid email format.";
    }
    if (password.trim().length < 8 || password.trim().length > 20) {
      newErrors.password = "Password must be between 8 to 20 characters.";
    }
    if (gender.length === 0) {
      newErrors.gender = "Please select a gender.";
    }
    if (phone.trim().length !== 10) {
      newErrors.phone = "Please enter a 10 digit phone number.";
    }
    if (dob.trim().length === 0) {
      newErrors.dob = "Please enter your date of birth.";
    } else if ((new Date().getFullYear() - new Date(dob).getFullYear()) < 5) {
      newErrors.dob = "Please enter a valid date of birth. Your age should be >= 5 years.";
    }
    if (address.trim().length === 0) {
      newErrors.address = "Please enter an address.";
    }
    if (role.trim().length === 0 || role.trim().length < 4) {
      newErrors.role = "Please enter role as 'user' or leave blank.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addUserToDB = () => {
    if (validate()) {
      const data = new FormData();
      data.append("username", username.trim());
      data.append("email", email.trim());
      data.append("password", password);
      data.append("gender", gender.trim());
      data.append("phone", phone);
      data.append("dob", dob);
      data.append("address", address.trim());
      data.append("role", role.trim());

      axios
        .post(url + "/user/addUser", data)
        .then((response) => {
          const result = response.data;
          if (result.status === "success") {
            history.push("/signin");
          } else {
            setErrors({ api: "Error while sign up!" });
          }
        })
        .catch((error) => {
          console.log(error);
          setErrors({ api: "Error while sign up!" });
        });
    }
  };

  return (
    <div className="container-wrapper">
      <Header />
      <div className="content-container">
        <div className="container">
          <h1 className="title-header">Sign Up</h1>
          {errors.api && <div className="error-message">{errors.api}</div>}
          <div className="mb-3">
            <label htmlFor="">User Name*</label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              required
              className="form-control"
              autoComplete="off"
            />
            {errors.username && <div className="error-message">{errors.username}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="">Email*</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="form-control"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="">Password*</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="form-control"
              autoComplete="off"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          <label htmlFor="">Gender*</label><br />
          <div
            className="form-check"
            onChange={(e) => setGender(e.target.value)}
          >
            <input type="radio" value="Male" name="gender" /> Male
            <br />
            <input type="radio" value="Female" name="gender" /> Female
            <br />
            <input type="radio" value="Other" name="gender" /> Other
            <br />
          </div>
          {errors.gender && <div className="error-message">{errors.gender}</div>}
          <div className="mb-3">
            <label htmlFor="">Phone*</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              required
              className="form-control"
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="">DOB*</label>
            <input
              onChange={(e) => setdob(e.target.value)}
              type="date"
              required
              defaultValue="2022-01-01"
              className="form-control"
            />
            {errors.dob && <div className="error-message">{errors.dob}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="">Address*</label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              required
              className="form-control"
            />
            {errors.address && <div className="error-message">{errors.address}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="">Role*</label>
            <input
              onChange={(e) => setRole(e.target.value)}
              type="text"
              required
              className="form-control"
            />
            {errors.role && <div className="error-message">{errors.role}</div>}
          </div>
          <div className="title-header">
            <button type="button" onClick={addUserToDB} className="btn btn-success">
              Register
            </button>
            &nbsp;&nbsp;
            <button type="button" onClick={history.goBack} className="btn btn-danger">
              Back
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
