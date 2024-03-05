import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyProfile.css";
const MyProfile = () => {
  const [isAuthenticated, setisAuthenticated] = useState("");
  const navigate = useNavigate();
  let token = localStorage.getItem("voting_user");
  useEffect(() => {
    handlecheck();
  }, []);
  const handlecheck = async () => {
    try {
      const { data } = await axios.get(
        "https://new-repo-vcxd.onrender.com/userprotected",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      setisAuthenticated(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handledata = () => {
    localStorage.removeItem("voting_user");
    navigate("/login");
  };
  return (
    <div>
      {" "}
      {isAuthenticated.username ? (
        <div>
          <div className="myprofile">
            <div>
              <h2>Username:</h2>
              <h2>{isAuthenticated.username}</h2>
            </div>
            <div>
              <h2>Email:</h2>
              <h2>{isAuthenticated.email}</h2>
            </div>
            <div>
              <h2>Phone Number:</h2>
              <h2>{isAuthenticated.phonenumber}</h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px",
              }}
            >
              <button onClick={() => navigate("/login")}>Home</button>
              <button onClick={handledata}>Logout</button>
            </div>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </div>
  );
};

export default MyProfile;
