import React from "react";
import { Button } from "antd";
import TitleHeader from "../../components/TitleHeader";
import { HelpImage } from "../../static/Images";

class Help extends React.Component {
  render() {
    return (
      <div>
        <TitleHeader title="CS330" alt="Help" image={HelpImage} />
      </div>
    );
  }
}

export default Help;
