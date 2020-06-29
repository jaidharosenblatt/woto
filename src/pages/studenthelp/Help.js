import React, { useState } from "react";
import { Row, Col } from "antd";

import InactiveSessionCard from "./InactiveSessionCard";
import Announcement from "../../components/announcement/Announcement";
import JoinQueue from "./JoinQueue";
import Waiting from "./Waiting";
import BeingHelped from "./BeingHelped";
import SubmitQuestion from "./SubmitQuestion";
import ActiveHeader from "./ActiveHeader";

/**
 * @jaidharosenblatt Page for students to recieve help for a given course
 */
const Help = ({ course }) => {
  const [status, setStatus] = useState(course.active ? "" : "inactive");
  const [announcement, setAnnouncement] = useState("a");
  const question = { hello: "a" };

  var page = null;
  switch (status) {
    case "inactive":
      page = <InactiveSessionCard courseName={course.name} />;
      break;
    case "preQuestion":
      page = (
        <SubmitQuestion
          courseName={course.name}
          submitQuestion={() => setStatus("questionSubmitted")}
        />
      );
      break;
    case "questionSubmitted":
      page = <Waiting question={question} />;
      break;
    case "helped":
      page = <BeingHelped question={question} />;
      break;
    default:
      page = (
        <JoinQueue
          courseName={course.name}
          queueSize={2}
          handleJoin={() => setStatus("preQuestion")}
        />
      );
      break;
  }
  const hideHeader = status === "inactive" || status === "";
  return (
    <div className="HelpWrapper">
      <div>
        {hideHeader ? null : <ActiveHeader courseName={course.name} />}
        <Row align="center">
          <Col span={24}>
            {announcement === "" || hideHeader ? null : (
              <Announcement message={announcement} />
            )}
          </Col>
        </Row>
        {page}
      </div>
    </div>
  );
};

export default Help;
