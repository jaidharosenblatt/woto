import React, { useState, useEffect, useContext } from "react";
import { Space, Button } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import SearchTable from "../../components/Tables/collabtable/SearchTable";
import { convertHelpData } from "./util/convertHelpData";
import TAInteractionInfo from "../../components/tacomponents/tainteraction/TAInteractionInfo";
import LeftRightRow from "../../components/leftrightrow/LeftRightRow";
import { useInterval } from "./useInterval";

import { connect } from "react-redux";
import actions from "../../redux/courses/actionCreators";
import selectors from "../../redux/selectors";

const HelpStudents = (props) => {
  const courseID = props.course?._id;
  const { session, course, activeQuestion, loading } = props;
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

  useInterval(async () => {
    console.log("Checking if new student has been added to the queue");
    props.loadQuestionSession(courseID, userID);
    loadData();
  });

  const loadData = async () => {
    const questions = session.questions;
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
      {session.activeQuestion && (
        <TAInteractionInfo
          course={course}
          session={session}
          question={activeQuestion}
          endInteraction={endInteraction}
        />
      )}
      <LeftRightRow
        left={
          <h2>
            Help Students{" "}
            {loading ? (
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
        helping={activeQuestion}
        colParams={{ help: true, helpStudent }}
        data={showAll ? helpedData : notHelpedData}
        course={course}
        loading={loading}
      />
    </Space>
  );
};

const mapStateToProps = (state) => {
  return {
    session: selectors.getSession(state),
    course: selectors.getCourse(state),
    activeQuestion: selectors.getActiveQuestion(state),
    loading: selectors.getLoading(state),
  };
};

const {
  loadQuestionSession,
  helpStudent,
  loadSession,
  finishHelpingStudent,
} = actions;

export default connect(mapStateToProps, {
  loadQuestionSession,
  helpStudent,
  loadSession,
  finishHelpingStudent,
})(HelpStudents);
