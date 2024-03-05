import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
const Admincount = () => {
  const [isAuthenticated, setisAuthenticated] = useState("");
  const [votecounte, setvotecount] = useState();
  const [winner, setwinner] = useState([]);
  const [winner_status, setwinner_status] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  let token = localStorage.getItem("voting_user");
  useEffect(() => {
    handlecheckauth();
  }, []);
  const handlecheckauth = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://voting-app-q78k.onrender.com/userprotected",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      setisAuthenticated(data);
    
      setLoading(false);
      handlewinnercheck();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handlewinnercheck = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://voting-app-q78k.onrender.com/winner/1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      setwinner(data[0].winner);
      setwinner_status(data[0].winner_status);
      setLoading(false);
      if (data[0].winner_status == false) {
        handlecheck();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handlecheck = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://voting-app-q78k.onrender.com/votescount/1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      const itemCounts = {
        "Candidate 1": 0,
        "Candidate 2": 0,
        "Candidate 3": 0,
        "Candidate 4": 0,
      };

      data.forEach((item) => {
        if (itemCounts[item.voting_name]) {
          itemCounts[item.voting_name]++;
        } else {
          itemCounts[item.voting_name] = 1;
        }
      });

      setvotecount(itemCounts);

      let sorting = Object.entries(itemCounts).sort(function (a, b) {
        return b[1] - a[1];
      });
      let winnerdata = [];
      for (let i = 0; i < sorting.length; i++) {
        winnerdata.push(sorting[i][0]);
        if (sorting[i][1] == sorting[i + 1][1]) {
          continue;
        } else {
          break;
        }
      }
      setwinner(winnerdata);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handlestatuschangewinner = async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `https://voting-app-q78k.onrender.com/winnerupdate/1`,
        {
          winner_status: !winner_status,
          winner: winner,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      setLoading(false);
      handlewinnercheck();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {isAuthenticated.role === "user" ? (
            navigate("/")
          ) : (
            <div>
              {winner_status ? (
                <div>
                  {winner.length === 1 ? (
                    <h1>Winner is {winner}</h1>
                  ) : (
                    <div>
                      <h1>Same Votes</h1>
                     {
                      winner && winner.map((el)=>(
                        <h3 key={el}>{el}</h3>
                      ))
                     }
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div>
                    {" "}
                    <h1>Total Votes Count </h1>{" "}
                    {votecounte &&
                      Object.keys(votecounte).map((key) => (
                        <div key={key}>
                          <h3>
                            {key}: {votecounte[key]}{" "}
                          </h3>
                        </div>
                      ))}{" "}
                  </div>
                </div>
              )}{" "}
              <div>
                <button
                  style={{
                    fontSize: "22px",
                    padding: "20px 50px",
                    marginTop: "25px",
                  }}
                  onClick={handlestatuschangewinner}
                >
                  {winner_status ? "Enable" : "Disable"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Admincount;
