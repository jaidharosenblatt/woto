import React from "react";
import { Row } from "antd";
import { Hourglass } from "../../static/Images";

import OpenSessionForm from "./OpenSessionForm";
import "./OpenSession.css";

/**
 * @MatthewSclar Page for TAs to open a session.
 *Uses:OpenSessionForm
 */

const OpenSession = () => {
  return (
    <div className="OpenSessionFormWrapper">
      <Row align="center">
        <img src={Hourglass} alt="Hourglass" />
      </Row>

      <Row align="center">
        <OpenSessionForm courseName="CS101" activesession={false} />
      </Row>
    </div>
  );
};

export default OpenSession;
