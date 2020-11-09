import React, { useState, useEffect, useContext } from "react";
import { Space, Button } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import SearchTable from "../../components/Tables/collabtable/SearchTable";
import { convertHelpData } from "./util/convertHelpData";
import TAInteractionInfo from "../../components/tacomponents/tainteraction/TAInteractionInfo";
import LeftRightRow from "../../components/leftrightrow/LeftRightRow";

import { CourseContext } from "./util/CourseContext";
import { connect } from "react-redux";
import {
  select,
  helpStudent,
  finishHelpingStudent,
  loadSession,
} from "../../ducks/courses";

const HelpStudents = (props) => {
  const { courses } = props;
  const courseID = useContext(CourseContext);
  const state = select(courses, courseID);
  const authContext = useContext(AuthContext);
  const userID = authContext.state.user._id;
  const user = authContext.state.user;

  const [notHelpedData, setNotHelpedData] = useState([]);
  const [helpedData, setHelpedData] = useState([]);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const questions = state.session.questions;
    let helped = [];
    let notHelped = [];

    if (questions) {
      helped = questions.filter((item) => item.assistant);
      notHelped = questions.filter(
        (item) => !item.assistant && item.active && item.description
      );
    }

    const a = convertHelpData(helped);
    const b = convertHelpData(notHelped);

    setHelpedData([...a]);
    setNotHelpedData([...b]);
  };

  function getTitle(user) {
    if (!user.graduationYear) {
      return "Instructor";
    }
    if ((user.graduationYear = "Graduate Student")) {
      return "Graduate Teaching Assistant";
    } else {
      return "Undergraduate Teaching Assistant";
    }
  }

  const helpStudent = async (student) => {
    const assistant = {
      id: userID,
      description: {
        name: user.name.split(" ")[0],
        role: getTitle(user),
        notifiedAt: new Date(),
        meetingURL: user.meetingURL,
      },
    };

    props.helpStudent(courseID, userID, student._id, assistant);
  };

  const endInteraction = async () => {
    props.finishHelpingStudent(courseID, userID, new Date());
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {state.session.activeQuestion && (
        <TAInteractionInfo
          course={state.course}
          session={state.session}
          question={state.session.activeQuestion}
          endInteraction={endInteraction}
        />
      )}
      <LeftRightRow
        left={
          <h2>
            Help Students{" "}
            {state.loading ? (
              <LoadingOutlined />
            ) : (
              <ReloadOutlined
                onClick={() => props.loadSession(courseID, userID)}
              />
            )}
          </h2>
        }
        right={
          <Button onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Active Queue" : "Show Helped Students"}
          </Button>
        }
      />
      <SearchTable
        help
        helping={!!state.session.activeQuestion}
        colParams={{ help: true, helpStudent }}
        data={showAll ? helpedData : notHelpedData}
        course={state.course}
        loading={state.loading}
      />
    </Space>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    courses: state.courses,
    ...prevProps,
  };
};

export default connect(mapStateToProps, {
  helpStudent,
  finishHelpingStudent,
  loadSession,
})(HelpStudents);
