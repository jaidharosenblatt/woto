import React from "react";
import { Button } from "antd";
import TitleHeader from "../../components/TitleHeader";

class Help extends React.Component {
  render() {
    return (
      <div>
        <TitleHeader title="CS330" alt="Help" image={require("./desk.svg")} />
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default Help;
