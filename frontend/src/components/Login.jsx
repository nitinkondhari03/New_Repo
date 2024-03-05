import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState("");
  const [emailempty, setemailempty] = useState(false);
  const [passwordempty, setpasswordempty] = useState(false);
  const [wrongcredentials, setwrongcredentials] = useState(false);
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
    setpasswordempty(false);
    setwrongcredentials(false);
    if (email == "") {
      setemailempty(true);
    }
    if (password == "") {
      setpasswordempty(true);
    }
    if (email == "" || password == "") {
      return;
    }
    let obj = {
      email,
      password,
    };
    try {
      let { data } = await axios.post("https://voting-app-q78k.onrender.com/login", obj);
      setloadingauth(false);
      if (!data.token) {
        return setwrongcredentials(true);
      }

      if (data.token) {
        localStorage.setItem("voting_user", data.token);
        navigate("/");
      }
      alert("Login Successfully");
    } catch (error) {
      setloadingauth(false);
      alert(error.message);
    }
  };

  //onChange

  //email
  const handleemail = (event) => {
    setwrongcredentials(false);
    setEmail(event.target.value);
    if (event.target.value == "") {
      setemailempty(true);
    } else {
      setemailempty(false);
    }
  };

  //password

  const handlepassword = (event) => {
    setwrongcredentials(false);
    setPassword(event.target.value);
    if (event.target.value == "") {
      setpasswordempty(true);
    } else {
      setpasswordempty(false);
    }
  };
  return (
    <div>
      {isAuthenticated.username ? (
        navigate("/")
      ) : (
        <div className="login_div">
          {wrongcredentials && (
            <div className="Wrong_Credentials">
              <span>Wrong Credentials</span>
            </div>
          )}

          <h1>Login</h1>
          <form onSubmit={handleformsubmit}>
            <input
              type="email"
              onChange={(event) => handleemail(event)}
              placeholder="Email"
              className={emailempty ? "emailloginempty" : "emaililoginnput"}
            />
            {emailempty && (
              <span className="plaseenter">Please Enter Email</span>
            )}
            <input
              onChange={(event) => handlepassword(event)}
              type="password"
              placeholder="Password"
              className={
                passwordempty ? "passwordloginempty" : "passwordlogininput"
              }
            />
            {passwordempty && (
              <span className="plaseenter">Please Enter Password</span>
            )}
            {loadingauth ? (
              <input type="submit" disabled value={"Loading..."} />
            ) : (
              <input type="submit" value={"Login"} />
            )}
          </form>
          <p>
            Create new User <Link to={"/register"}>Register</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
