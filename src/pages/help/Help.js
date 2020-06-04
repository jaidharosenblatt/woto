import React from "react";
import TitleHeader from "../../components/TitleHeader";
import IconTag from "../../components/IconTag";
import { HelpImage, LocationImage, ClockImage } from "../../static/Images";
import "./Help.css";
class Help extends React.Component {
  render() {
    const sessionDetail = (
      <div className="IconTags">
        <IconTag tag="Virtual" image={LocationImage} />
        <IconTag tag="Now - 4pm" image={ClockImage} />
      </div>
    );
    return (
      <div>
        <TitleHeader
          title="CS330"
          alt="Help"
          image={HelpImage}
          details={sessionDetail}
        />
      </div>
    );
  }
}

export default Help;
