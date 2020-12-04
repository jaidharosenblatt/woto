import React, { useState, useEffect } from "react";
import { Space, Button } from "antd";
import SearchTable from "../../components/Tables/questionTable/SearchTable";
import { convertHelpData } from "./util/convertHelpData";
import TAInteractionInfo from "../../components/tacomponents/tainteraction/TAInteractionInfo";
import LeftRightRow from "../../components/leftrightrow/LeftRightRow";
import { useInterval } from "./useInterval";

import { connect } from "react-redux";
import {
  helpStudent,
  finishHelpingStudent,
} from "../../redux/courses/actions/ta";
import { loadQuestionSession } from "../../redux/courses/actions/student";
import selectors from "../../redux/selectors";

const HelpStudents = (props) => {
  const { session, questions, course, activeQuestion, loading } = props;
  const [notHelpedData, setNotHelpedData] = useState([]);
  const [helpedData, setHelpedData] = useState([]);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(async () => {
    props.loadQuestionSession();
    loadData();
  });

  const loadData = async () => {
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

  const _helpStudent = async (student) => {
    await props.helpStudent(student._id);
  };

  const endInteraction = async () => {
    props.finishHelpingStudent();
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {activeQuestion && (
        <TAInteractionInfo
          course={course}
          session={session}
          question={activeQuestion}
          endInteraction={endInteraction}
        />
      )}
      <LeftRightRow
        left={<h2>Help Students</h2>}
        right={
          <Button onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Active Queue" : "Show Helped Students"}
          </Button>
        }
      />
      <SearchTable
        help
        helping={activeQuestion}
        colParams={{ help: true, _helpStudent }}
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
    questions: selectors.getQuestions(state),
  };
};

export default connect(mapStateToProps, {
  loadQuestionSession,
  helpStudent,
  finishHelpingStudent,
})(HelpStudents);
