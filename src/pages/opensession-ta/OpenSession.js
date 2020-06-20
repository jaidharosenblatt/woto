import React from "react";
import {Row, Button} from "antd";
import { Hourglass } from "../../static/Images";

import OpenSessionForm from "./OpenSessionForm";
import "./OpenSession.css"


/**
 * @MatthewSclar Page for TAs to open a session.
 *Uses:OpenSessionForm
 */

const OpenSession = () => {
  return (<div>
    <div className="OpenSessionFormWrapper">
      <Row align="center">
        <img src={Hourglass} />
      </Row>

      <Row align="center">
        <OpenSessionForm courseName="CS101" activesession={false} />
      </Row>

    </div>

    <Button type="primary" href="/demo">
          HEY CHECK OUT THESE SICK COMPONENT DEMOS OH EEEEE
    </Button>
    </div>

  );
};

export default OpenSession;
