import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Admincount from "./Admincount";
import Voteuser from "./Voteuser";
import Loading from "./Loading";
const Home = () => {
  const [isAuthenticated, setisAuthenticated] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  let token = localStorage.getItem("voting_user");
  useEffect(() => {
    handlecheck();
  }, []);
  const handlecheck = async () => {
    setloading(true);
    try {
      const { data } = await axios.get("https://new-repo-vcxd.onrender.com/userprotected", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      setisAuthenticated(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {isAuthenticated.username ? (
            <div>
              <Navbar />
              {isAuthenticated.role == "admin" ? <Admincount /> : <Voteuser />}
            </div>
          ) : (
            navigate("/login")
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
