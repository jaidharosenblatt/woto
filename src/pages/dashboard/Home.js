import React from "react";
import "./Home.css";
import TommyTestHome from "./TommyTestHome"

const Home = () => {
  return (
    <div style={{ height: "120%", backgroundColor: "red" }}>
      I'm an ugly div that allows for scrolling
      <TommyTestHome />
    </div>
  );
};

export default Home;
