import React, { useState } from "react";
import { url } from "../../../Commons/constants";
import axios from "axios";
import { useHistory } from "react-router";
import { Header } from "../../Components/Header";
import Footer from "../../Components/Footer";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const sendOtp = () => {
    if (email.length === 0) alert("Enter Email !");
    console.log(email);
    let obj = { email: email };
    axios.post(`http://localhost:4000/api/forgot_password/send_otp`, obj).then(alert("Success"));
  };

  const verifyOtpSetPassword = () => {
    let obj = { email: email, password: password, otp: otp };
    console.log(obj);
    axios
      .put(`http://localhost:4000/api/forgot_password/verify_otp`, obj)
      .then((res) => {
        alert("Success");
        history.push("/signin");
      })
      .catch("Error");
  };

  const changePassword = () => {
    if (password.length === 0) alert("Enter Password");
    else if (confirmPassword.length === 0) alert("Confirm Password");
    else if (password !== confirmPassword) alert("Password Not Matched...!");
    else {
      const data = new FormData();
      data.append("password", confirmPassword);
      data.append("user", user.userid);

      axios.put(url + "/email/reset", data).then((response) => {
        const result = response.data;
        if (result.status === "success") {
          console.log(result);
          alert("Password changed successfully");
          history.push("/signin");
        }
      });
    }
  };

  return (
    <div className="flex-container">
      <Header />
      <div className="container content" style={{ margin: "auto", width: "50%" }}>
        <h1 className="title-header"> Reset Password</h1>
        <div>
          <div id="email-container" className="container" style={{ insetBlock: "30%" }}>
            <br />
            <br />
            <div className="card">
              <div id="otp-div">
                <div className="card-body align-items-center">
                  <h5 className="card-title align-items-center d-flex justify-content-center">
                    <div className="container ">
                      <span className="label label-info">Email :</span>
                      <br />
                      <br />
                      <input
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                      />
                    </div>
                  </h5>
                  <br />
                  <button type="button" onClick={sendOtp} className="form-control btn btn-info ">
                    Send OTP
                  </button>
                </div>

                <div className="card-body">
                  <h5 className="card-title align-items-center justify-content-center">
                    <div className="container ">
                      <span className="label label-info">Enter OTP Received :</span>
                      <br />
                      <br />
                      <input
                        onChange={(event) => {
                          setOtp(event.target.value);
                        }}
                        type="text"
                        id="input"
                        className="form-control"
                        required="required"
                        placeholder="Enter OTP received"
                      />
                      <br />
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <br />
                    </div>
                  </h5>
                  <br />
                  <button
                    className="form-control btn btn-info align-items-center justify-content-center"
                    onClick={verifyOtpSetPassword}
                  >
                    Verify OTP to change password
                  </button>
                </div>
              </div>

              <div id="pass-div" style={{ visibility: "hidden", position: "absolute" }}>
                <div className="card-body">
                  <h5 className="card-title align-items-center d-flex justify-content-center">
                    <div className="container ">
                      <span className="label label-info">Enter New Password *</span>
                      <input
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </h5>
                  <br />
                </div>

                <div className="card-body">
                  <h5 className="card-title align-items-center d-flex justify-content-center">
                    <div className="container ">
                      <span className="label label-info">Confirm Password *</span>
                      <input
                        onChange={(event) => {
                          setConfirmPassword(event.target.value);
                        }}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </h5>
                  <br />
                </div>
                <button
                  type="button"
                  onClick={changePassword}
                  className="form-control btn btn-info align-items-center d-flex justify-content-center"
                >
                  Change Password
                </button>
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
