import axios from "axios";
import React, { useState, useEffect } from "react";
import Stats from "./components/Stats.js";
import "./App.css";


export default function App() {
  const [stats, setStats] = useState([]);
  const [formInputs, updateFormInputs] = useState({
    name: "",
    yards: "",
    team: "",
    img: "",
  });
  useEffect(() => {
    getStats();
  }, []);
  const getStats = async () => {
    try {
      const res = await fetch("http://localhost:3000/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    const updateInput = Object.assign({}, formInputs, {
      [event.target.id]: event.target.value,
    });
    updateFormInputs(updateInput);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/stats",
        formInputs
      );
      const data = response.data
      await updateFormInputs({
        name: "",
        yards: "",
        team: "",
        img: "",
      });
      await setStats([data, ...stats]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="app">
      <h1 style={{color:"whitesmoke"}}> QB Passing Yards Stats</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={formInputs.name}
          onChange={handleChange}
        />
        <label htmlFor="yards">Yards</label>
        <input
          type="text"
          id="yards"
          value={formInputs.yards}
          onChange={handleChange}
        />
        <label htmlFor="team">Team</label>
        <input
          type="text"
          id="team"
          value={formInputs.team}
          onChange={handleChange}
        />
        <label htmlFor="img">Img</label>
        <input
          type="text"
          id="img"
          value={formInputs.img}
          onChange={handleChange}
        />
        <input type="submit" className="submit" />
      </form>
      <main>
        <Stats stats={stats}/>
      </main>
    </div>
  );
}
