import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [username, setusername] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState("");
  const [password, setPassword] = useState("");
  const [usernameempty, setusernameempty] = useState(false);
  const [emailempty, setemailempty] = useState(false);
  const [passwordempty, setpasswordempty] = useState(false);
  const [phonenumberempty, setphonenumberempty] = useState(false);
  const [emailexit, setemailexit] = useState(false);
  const [loadingauth, setloadingauth] = useState(false);
  const navigate = useNavigate();
  let token = localStorage.getItem("voting_user");
  useEffect(() => {
    handlecheck();
  }, []);
  const handlecheck = async () => {
    try {
      const { data } = await axios.get("https://voting-app-q78k.onrender.com/userprotected", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      setisAuthenticated(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleformsubmit = async (event) => {
    setloadingauth(true);
    event.preventDefault();
    setemailempty(false);
    setusernameempty(false);
    setpasswordempty(false);
    setphonenumberempty(false);
    setemailexit(false);
    if (username === "") {
      setusernameempty(true);
    }
    if (email === "") {
      setemailempty(true);
    }
    if (password === "") {
      setpasswordempty(true);
    }
    if (phonenumber === "") {
      setphonenumberempty(true);
    }
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      phonenumber === ""
    ) {
      return;
    }
    let obj = {
      username,
      email,
      password,
      phonenumber,
    };
    try {
      let { data } = await axios.post("https://voting-app-q78k.onrender.com/register", obj);
      setloadingauth(false);
      if (data.message === "Email already Exit") {
        return setemailexit(true);
      }
      alert("Registration Successfully");
      navigate("/");
    } catch (error) {
      setloadingauth(false);
      alert(error.message);
    }
  };
  //OnChange

  //username
  const handleusername = (event) => {
    setemailexit(false);
    setusername(event.target.value);
    if (event.target.value === "") {
      setusernameempty(true);
    } else {
      setusernameempty(false);
    }
  };

  //email
  const handleemail = (event) => {
    setemailexit(false);
    setEmail(event.target.value);
    if (event.target.value === "") {
      setemailempty(true);
    } else {
      setemailempty(false);
    }
  };

  //password
  const handlepassword = (event) => {
    setemailexit(false);
    setPassword(event.target.value);
    if (event.target.value === "") {
      setpasswordempty(true);
    } else {
      setpasswordempty(false);
    }
  };

  //phone number
  const handlephonenumber = (event) => {
    setemailexit(false);
    setphonenumber(event.target.value);
    if (event.target.value == "") {
      setphonenumberempty(true);
    } else {
      setphonenumberempty(false);
    }
  };
  return (
    <div>
      {isAuthenticated.username ? (
        navigate("/")
      ) : (
        <div className="Register_div">
          {emailexit && (
            <div style={{ display: "flex" }}>
              <span className="emailexit">Email already Exit</span>
            </div>
          )}
          <h1>Register</h1>
          <form onSubmit={handleformsubmit}>
            <input
              type="text"
              onChange={(event) => handleusername(event)}
              placeholder="Username"
              className={usernameempty ? "usernameempty" : "usernameinput"}
            />
            {usernameempty && (
              <span className="plaseenterregister">Please Enter Username</span>
            )}
            <input
              type="email"
              onChange={(event) => handleemail(event)}
              placeholder="Email"
              className={emailempty ? "emailempty" : "emailinput"}
            />
            {emailempty && (
              <span className="plaseenterregister">Please Enter Email</span>
            )}
            <input
              onChange={(event) => handlepassword(event)}
              type="password"
              placeholder="Password"
              className={passwordempty ? "passwordempty" : "passwordinput"}
            />
            {passwordempty && (
              <span className="plaseenterregister">Please Enter Password</span>
            )}
            <input
              onChange={(event) => handlephonenumber(event)}
              type="tel"
              minLength="10"
              maxLength="10"
              placeholder="Phone Number"
              className={
                phonenumberempty ? "phonenumberempty" : "phonenumberinput"
              }
            />
            {phonenumberempty && (
              <span className="plaseenterregister">
                Please Enter Phone Number
              </span>
            )}
            {loadingauth ? (
              <input type="submit" disabled value={"Loading..."} />
            ) : (
              <input type="submit" value={"Register"} />
            )}
          </form>
          <p>
            User Already Exists <Link to={"/login"}>Login</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
