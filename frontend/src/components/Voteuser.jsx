import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

const Voteuser = () => {
  const [value, setvalue] = useState();
  const [votes, setgetvotes] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState("");
  const [Votesuccefully, setVotesuccefully] = useState(false);
  const [checkwiner, setcheckwiner] = useState(false);
  const [winneris, setwinner] = useState("");
  const [isLoading, setLoading] = useState(false);
  let token = localStorage.getItem("voting_user");

  useEffect(() => {
    handlewinnercheck();
  }, []);
  const handlewinnercheck = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://voting-app-q78k.onrender.com/winner/1`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      setcheckwiner(data[0].winner_status);
      setwinner(data[0].winner);
      setLoading(false);
      if (!data[0].winner_status) {
        handlecheckauth();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handlecheckauth = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://voting-app-q78k.onrender.com/votesid/1`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      setLoading(false);
      if (data[0]) {
        return setisAuthenticated(data[0]);
      } else {
        return handlecheck();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handlecheck = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://voting-app-q78k.onrender.com/vote/1`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      setgetvotes(data[0].voting_candidate);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handlesumit = async (event) => {
    setLoading(true);
    setVotesuccefully(false);
    event.preventDefault();
  
    let obj = {
      voting_name: value,
    };
   
    try {
      let { data } = await axios.post(`https://voting-app-q78k.onrender.com/votes/1`, obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      setVotesuccefully(true);
      setLoading(false);
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
          {checkwiner ? (
            <div>
              {winneris.length === 1 ? (
                <h1>Winner is {winneris}</h1>
              ) : (
                <div>
                  <h1>Same Votes</h1>
                  {winneris && winneris.map((el) => <h3 key={el}>{el}</h3>)}
                </div>
              )}
            </div>
          ) : (
            <div>
              {isAuthenticated.email ? (
                <div>
                  {" "}
                  <h3>You already voted</h3>
                </div>
              ) : (
                <div
                  style={{
                    maxWidth: "350px",
                    margin: "auto",
                    marginTop: "20px",
                  }}
                >
                  {Votesuccefully ? (
                    <div>
                      <h2>Vote succefully</h2>
                    </div>
                  ) : (
                    <form onSubmit={handlesumit}>
                      {votes &&
                        votes.map((el, i) => (
                          <div key={el}>
                            <h4>
                              <input
                                type="radio"
                                onChange={(event) =>
                                  setvalue(event.target.value)
                                }
                                id={el}
                                name="vote"
                                value={el}
                              />
                              {el}
                            </h4>
                          </div>
                        ))}
                      <input
                        style={{
                          marginTop: "20px",
                          width: "200px",
                          height: "50px",
                          fontSize: "25px",
                        }}
                        type="submit"
                        value={"VOTE"}
                      />
                    </form>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Voteuser;
