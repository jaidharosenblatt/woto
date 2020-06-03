import React from "react";
import { Button } from "antd";
import TitleHeader from "../../components/TitleHeader";

class Help extends React.Component {
  render() {
    return (
      <div>
        <TitleHeader image="desk.png" />
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default Help;
