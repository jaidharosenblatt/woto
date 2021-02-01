import React from "react";

const HomeHeader = (props) => {
  return (
    <div className="HomeHeader">
      <h1>
        {`${props.course}  
        ${props.page}`}
      </h1>
      <p>{props.description}</p>
    </div>
  );
};

export default HomeHeader;
