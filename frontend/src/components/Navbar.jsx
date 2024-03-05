import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Navabar.css";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  const [user, setUser] = useState("");
  const [profiles, setprofile] = useState(false);
  const navigate = useNavigate();
  var token = localStorage.getItem("voting_user");
  useEffect(() => {
    handlefech();
  }, []);
  const handlefech = async () => {
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
      if (!data.username) {
        navigate("/login");
      }
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handledata = () => {
    localStorage.removeItem("voting_user");
    navigate("/login");
  };
  return (
    <div className="navbardiv">
      <div className="navbar">
        <div>
          <h2 onClick={() => navigate("/")}>Voting App</h2>
        </div>
        <div className="profilecheck">
          <div
            style={{ display: "flex" }}
            onClick={() => setprofile(!profiles)}
          >
            {user && (
              <h1>
                <CgProfile />
              </h1>
            )}
          </div>
          {profiles && (
            <div className="userlogout">
              <h3 onClick={() => navigate("/profile")}>My Profile</h3>
              <h3 onClick={handledata}>Logout</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
