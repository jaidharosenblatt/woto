import React from "react";
import { Collapse } from "antd";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const CSVRosterStatus = (props) => {
  const { failures, successes } = props;

  if (!failures || !successes) {
    return null;
  }
  return (
    <Collapse>
      <Collapse.Panel
        header={
          <p>
            <CheckCircleOutlined /> {`Added ${successes.length} students`}
          </p>
        }
      >
        {successes.map((student, i) => (
          <p key={i}>{student.message}</p>
        ))}
      </Collapse.Panel>
      <Collapse.Panel
        header={
          <p>
            <CloseCircleOutlined />{" "}
            {`Unable to enroll ${failures.length} students`}
          </p>
        }
      >
        {failures.map((student, i) => (
          <p key={i}>{student.message}</p>
        ))}
      </Collapse.Panel>
    </Collapse>
  );
};

const mapStateToProps = (state) => {
  const status = selectors.getRosterStatus(state);
  return {
    failures: status?.failures,
    successes: status?.successes,
  };
};
export default connect(mapStateToProps)(CSVRosterStatus);
