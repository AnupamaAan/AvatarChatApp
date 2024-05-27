import React, { useState } from "react";
// import logo from '../public/img/typechat-logo-inner.svg'
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Action/ActionCreator";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserDetails({ ...userDetails, [name]: value });
    console.log(userDetails, "userdetails");
  };

  // var formData = new FormData()
  // formData.append('username', userDetails.username)
  // formData.append('password', userDetails.password)

  const handleLogin = () => {
    var formData = new FormData();
    formData.append("username", userDetails.username);
    formData.append("password", userDetails.password);
    dispatch(
      loginUser(formData, (res) => {
        if ("data" in res) {
          //console.log(res, "hiii");
          localStorage.setItem("accesstoken", res.data["access"]);
          localStorage.setItem("refreshtoken", res.data["refresh"]);
          navigate('/dashboard')
        }
      })

    );
  };

  return (
    <>
      <div className="container-login">
        <img src="img/logo.svg" alt="" className="logo" />

        <div className="form">
          <h3 className="welcome-text" style={{ textAlign: "center" }}>
            Welcome back
          </h3>

          <div className="form-inner">
            <input
              type="text"
              name="username"
              id="email"
              placeholder="Email address"
              value={userDetails.username}
              onChange={handleChange}
            />{" "}
            <br />
            <input
              type="password"
              name="password"
              id="pass"
              placeholder="Password"
              value={userDetails.password}
              onChange={handleChange}
            />{" "}
            <br />
            <button className="login-btn" onClick={handleLogin}>
              Continue
            </button>
            <p className="login-up-btn">
              {" "}
              Don't ave an account? <a href="/signuppage">Sign up</a>{" "}
            </p>
            <p className="login-up-btn">
              Are you Forgot <a href="">Password</a>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
