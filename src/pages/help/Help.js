import React from "react";
import TitleHeader from "../../components/TitleHeader";
import { HelpImage, LocationImage } from "../../static/Images";
import IconTag from "../../components/IconTag";

class Help extends React.Component {
  render() {
    const sessionDetail = (
      <div>
        <IconTag locationName="Virtual" image={LocationImage} />
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
