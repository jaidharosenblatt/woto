import React from "react";
import TAInfo from "./TAInfo";
import ChartDisplay from "../../ChartComponent/ChartDisplay";

class AtAGlance extends React.Component {
  render() {
    return (
      <>
        <TAInfo />
        <ChartDisplay />
      </>
    );
  }
}

export default AtAGlance;
